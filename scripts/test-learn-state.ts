// Tests for progress sanitizing and merging: run with `npm test`.
import assert from "node:assert/strict";
import { test } from "node:test";
import { EMPTY_STATE, mergeProgress, sanitize, type LearnState } from "../lib/learnState";

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

test("a gap between the two sides: only the newer streak counts", () => {
  const m = mergeProgress(
    s({ streak: 12, lastDay: "2026-09-20", days: ["2026-09-20"] }),
    s({ streak: 2, lastDay: "2026-09-28", days: ["2026-09-27", "2026-09-28"] })
  );
  assert.equal(m.streak, 2);
  assert.equal(m.lastDay, "2026-09-28");
});

test("consecutive days on two devices: the streak continues (12 yesterday + today = 13)", () => {
  const m = mergeProgress(
    s({ streak: 12, lastDay: "2026-09-27", days: ["2026-09-26", "2026-09-27"] }),
    s({ streak: 1, lastDay: "2026-09-28", days: ["2026-09-28"] })
  );
  assert.equal(m.streak, 13);
});

test("streak carries across a month boundary", () => {
  const m = mergeProgress(
    s({ streak: 5, lastDay: "2026-09-30", days: ["2026-09-30"] }),
    s({ streak: 1, lastDay: "2026-10-01", days: ["2026-10-01"] })
  );
  assert.equal(m.streak, 6);
});

test("same last day: the longer streak wins", () => {
  const m = mergeProgress(
    s({ streak: 5, lastDay: "2026-09-28", days: ["2026-09-28"] }),
    s({ streak: 3, lastDay: "2026-09-28", days: ["2026-09-28"] })
  );
  assert.equal(m.streak, 5);
});

test("learned days are united and sorted", () => {
  const m = mergeProgress(s({ days: ["2026-09-27", "2026-09-25"] }), s({ days: ["2026-09-28", "2026-09-27"] }));
  assert.deepEqual(m.days, ["2026-09-25", "2026-09-27", "2026-09-28"]);
});

test("today's XP keeps only the latest day", () => {
  const m = mergeProgress(s({ todayXp: { "2026-09-27": 40 } }), s({ todayXp: { "2026-09-28": 15 } }));
  assert.deepEqual(m.todayXp, { "2026-09-28": 15 });
});

test("the most recently chosen program wins, whichever side sends it", () => {
  // phone chose M2 later; the laptop still holds its older M1 choice and syncs
  const account = s({ program: "M2", programAt: 2000 });
  const laptop = s({ program: "M1", programAt: 1000 });
  assert.equal(mergeProgress(account, laptop).program, "M2");
  // a newer choice on this device does win
  assert.equal(mergeProgress(account, s({ program: "M1", programAt: 3000 })).program, "M1");
});

test("a device without a program never erases the account's choice", () => {
  const m = mergeProgress(s({ program: "M1", programAt: 1000 }), s({ program: null, programAt: 0 }));
  assert.equal(m.program, "M1");
  assert.equal(m.programAt, 1000);
});

test("merging into an empty account keeps everything the browser had", () => {
  const local = s({
    done: { luceafarul: 1 },
    xp: 15,
    streak: 1,
    lastDay: "2026-09-28",
    days: ["2026-09-28"],
    todayXp: { "2026-09-28": 15 },
    program: "M1",
    programAt: 500,
  });
  assert.deepEqual(mergeProgress(EMPTY_STATE, local), local);
});

test("sanitize drops unknown ids and out-of-range values instead of clamping them", () => {
  const clean = sanitize({
    done: { luceafarul: 0.8, "nu-exista": 1, ion: 7, roman: "x" },
    tests: { progresii: 12, functii: 8.5, geometrie: 9, hack: 10 },
    xp: -50,
    streak: "3",
    lastDay: "ieri",
    days: ["2026-09-28", "2026-9-1", 42],
    todayXp: { "2026-09-28": 20 },
    program: "M9",
    programAt: 123,
    extra: { polluted: true },
  });
  assert.deepEqual(clean.done, { luceafarul: 0.8 });
  assert.deepEqual(clean.tests, { geometrie: 9 });
  assert.equal(clean.xp, 0);
  assert.equal(clean.streak, 0);
  assert.equal(clean.lastDay, null);
  assert.deepEqual(clean.days, ["2026-09-28"]);
  assert.deepEqual(clean.todayXp, { "2026-09-28": 20 });
  assert.equal(clean.program, null);
  assert.equal(clean.programAt, 0);
  assert.equal("extra" in clean, false);
});

test("sanitize turns non-objects into an empty state", () => {
  assert.deepEqual(sanitize(null), EMPTY_STATE);
  assert.deepEqual(sanitize([1, 2]), EMPTY_STATE);
  assert.deepEqual(sanitize("x"), EMPTY_STATE);
});

test("sanitize rejects a program time in the future", () => {
  const clean = sanitize({ program: "M2", programAt: Date.now() + 10 * 86_400_000 });
  assert.equal(clean.program, "M2");
  assert.equal(clean.programAt, 0);
});
