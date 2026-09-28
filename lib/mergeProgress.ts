import { ALL_LESSONS, TEST_SIZE, UNITS } from "./content";
import type { Program } from "./content/types";

// The shape of one student's progress, and the two pure functions that keep it
// safe on the server: `sanitize` (never trust what a browser sends) and
// `mergeProgress` (two devices' progress combined without losing work).

export interface LearnState {
  /** lessonId → best accuracy (0–1) */
  done: Record<string, number>;
  xp: number;
  streak: number;
  /** yyyy-mm-dd (local) of the last day a lesson was finished */
  lastDay: string | null;
  /** local days with at least one finished lesson, oldest first (max 60) */
  days: string[];
  /** XP earned per day — only the latest day is kept */
  todayXp: Record<string, number>;
  /** chapter (unit) id → best chapter-test score, out of TEST_SIZE */
  tests: Record<string, number>;
  /** Math exam variant; null until chosen. */
  program: Program | null;
}

export const EMPTY_STATE: LearnState = {
  done: {},
  xp: 0,
  streak: 0,
  lastDay: null,
  days: [],
  todayXp: {},
  tests: {},
  program: null,
};

const LESSON_IDS = new Set(ALL_LESSONS.map((l) => l.id));
const UNIT_IDS = new Set(UNITS.map((u) => u.id));
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const MAX_XP = 10_000_000;
const MAX_STREAK = 100_000;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const num = (v: unknown, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : null;
const int = (v: unknown, min: number, max: number) => {
  const n = num(v, min, max);
  return n == null ? null : Math.floor(n);
};

/** Keep only well-formed values for lessons and chapters that exist. */
export function sanitize(input: unknown): LearnState {
  if (!isObj(input)) return { ...EMPTY_STATE };
  const done: Record<string, number> = {};
  if (isObj(input.done)) {
    for (const [id, v] of Object.entries(input.done)) {
      const acc = num(v, 0, 1);
      if (LESSON_IDS.has(id) && acc != null) done[id] = acc;
    }
  }
  const tests: Record<string, number> = {};
  if (isObj(input.tests)) {
    for (const [id, v] of Object.entries(input.tests)) {
      const score = int(v, 0, TEST_SIZE);
      if (UNIT_IDS.has(id) && score != null) tests[id] = score;
    }
  }
  const days = Array.isArray(input.days)
    ? [...new Set(input.days.filter((d): d is string => typeof d === "string" && DAY.test(d)))].sort().slice(-60)
    : [];
  const todayXp: Record<string, number> = {};
  if (isObj(input.todayXp)) {
    const latest = Object.keys(input.todayXp).filter((d) => DAY.test(d)).sort().at(-1);
    const v = latest ? int(input.todayXp[latest], 0, MAX_XP) : null;
    if (latest && v != null) todayXp[latest] = v;
  }
  const lastDay = typeof input.lastDay === "string" && DAY.test(input.lastDay) ? input.lastDay : null;
  return {
    done,
    xp: int(input.xp, 0, MAX_XP) ?? 0,
    streak: int(input.streak, 0, MAX_STREAK) ?? 0,
    lastDay,
    days,
    todayXp,
    tests,
    program: input.program === "M1" || input.program === "M2" ? input.program : null,
  };
}

function maxPerKey(a: Record<string, number>, b: Record<string, number>) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
}

/**
 * Combine the progress saved on the server (`stored`) with what a browser just
 * sent (`incoming`). Nothing earned on either side is lost: best score per
 * lesson and test, every learned day, the more recent streak, the larger XP.
 * XP can't be added up (both sides may hold the same lessons), so the larger wins.
 * The program follows the browser when it has one: that's the latest choice.
 */
export function mergeProgress(stored: LearnState, incoming: LearnState): LearnState {
  const lastDay =
    [stored.lastDay, incoming.lastDay].filter((d): d is string => d != null).sort().at(-1) ?? null;
  const streakOf = (s: LearnState) => (s.lastDay === lastDay ? s.streak : 0);
  const today = [...Object.keys(stored.todayXp), ...Object.keys(incoming.todayXp)].sort().at(-1);
  return {
    done: maxPerKey(stored.done, incoming.done),
    tests: maxPerKey(stored.tests, incoming.tests),
    xp: Math.max(stored.xp, incoming.xp),
    streak: Math.max(streakOf(stored), streakOf(incoming)),
    lastDay,
    days: [...new Set([...stored.days, ...incoming.days])].sort().slice(-60),
    todayXp: today
      ? { [today]: Math.max(stored.todayXp[today] ?? 0, incoming.todayXp[today] ?? 0) }
      : {},
    program: incoming.program ?? stored.program,
  };
}
