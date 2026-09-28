// Tests for the progress merge: run with `npm test`.
import assert from "node:assert/strict";
import { test } from "node:test";
import { EMPTY_STATE, mergeProgress, sanitize, type LearnState } from "../lib/mergeProgress";

const s = (patch: Partial<LearnState>): LearnState => ({ ...EMPTY_STATE, ...patch });

test("keeps the best accuracy per lesson from both sides", () => {
  const m = mergeProgress(
    s({ done: { "progresii-aritmetice": 0.5, "progresii-geometrice": 1 } }),
    s({ done: { "progresii-aritmetice": 0.9, luceafarul: 0.7 } })
  );
  assert.deepEqual(m.done, { "progresii-aritmetice": 0.9, "progresii-geometrice": 1, luceafarul: 0.7 });
});

test("keeps the best test score per chapter", () => {
  const m = mergeProgress(s({ tests: { progresii: 9 } }), s({ tests: { progresii: 6, functii: 8 } }));
  assert.deepEqual(m.tests, { progresii: 9, functii: 8 });
});

test("streak comes from the side that learned most recently", () => {
  const m = mergeProgress(
    s({ streak: 12, lastDay: "2026-09-20" }),
    s({ streak: 2, lastDay: "2026-09-28" })
  );
  assert.equal(m.streak, 2);
  assert.equal(m.lastDay, "2026-09-28");
});

test("same last day: the longer streak wins", () => {
  const m = mergeProgress(s({ streak: 5, lastDay: "2026-09-28" }), s({ streak: 3, lastDay: "2026-09-28" }));
  assert.equal(m.streak, 5);
});

test("learned days are united, sorted, capped at 60", () => {
  const m = mergeProgress(s({ days: ["2026-09-27", "2026-09-25"] }), s({ days: ["2026-09-28", "2026-09-27"] }));
  assert.deepEqual(m.days, ["2026-09-25", "2026-09-27", "2026-09-28"]);
});

test("today's XP keeps only the latest day", () => {
  const m = mergeProgress(s({ todayXp: { "2026-09-27": 40 } }), s({ todayXp: { "2026-09-28": 15 } }));
  assert.deepEqual(m.todayXp, { "2026-09-28": 15 });
});

test("the browser's program choice wins, but a missing one doesn't erase the stored one", () => {
  assert.equal(mergeProgress(s({ program: "M1" }), s({ program: "M2" })).program, "M2");
  assert.equal(mergeProgress(s({ program: "M1" }), s({ program: null })).program, "M1");
});

test("merging into an empty account keeps everything the browser had", () => {
  const local = s({ done: { luceafarul: 1 }, xp: 15, streak: 1, lastDay: "2026-09-28", days: ["2026-09-28"] });
  assert.deepEqual(mergeProgress(EMPTY_STATE, local), { ...local, todayXp: {} });
});

test("sanitize drops unknown ids, bad numbers and junk", () => {
  const clean = sanitize({
    done: { luceafarul: 0.8, "nu-exista": 1, ion: 7, roman: "x" },
    tests: { progresii: 12.7, hack: 10 },
    xp: -50,
    streak: "3",
    lastDay: "ieri",
    days: ["2026-09-28", "2026-9-1", 42],
    todayXp: { "2026-09-28": 20 },
    program: "M9",
    extra: { __proto__: { polluted: true } },
  });
  assert.deepEqual(clean.done, { luceafarul: 0.8, ion: 1 });
  assert.deepEqual(clean.tests, { progresii: 10 });
  assert.equal(clean.xp, 0);
  assert.equal(clean.streak, 0);
  assert.equal(clean.lastDay, null);
  assert.deepEqual(clean.days, ["2026-09-28"]);
  assert.equal(clean.program, null);
  assert.equal("extra" in clean, false);
});

test("sanitize turns non-objects into an empty state", () => {
  assert.deepEqual(sanitize(null), EMPTY_STATE);
  assert.deepEqual(sanitize([1, 2]), EMPTY_STATE);
  assert.deepEqual(sanitize("x"), EMPTY_STATE);
});
