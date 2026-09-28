import { ALL_LESSONS, TEST_SIZE, UNITS } from "./content";
import type { Program } from "./content/types";

// One student's progress: its shape, and the two pure functions that keep it
// safe on the server — `sanitize` (never trust what a browser sends) and
// `mergeProgress` (two devices' progress combined without losing work).
// Shared by the browser (lib/progress.ts) and the server (app/api/progress).

export interface LearnState {
  /** lessonId → best accuracy (0–1) */
  done: Record<string, number>;
  xp: number;
  streak: number;
  /** yyyy-mm-dd (local) of the last day a lesson was finished */
  lastDay: string | null;
  /** local days with at least one finished lesson, oldest first (max MAX_DAYS) */
  days: string[];
  /** XP earned per day — only the latest day is kept */
  todayXp: Record<string, number>;
  /** chapter (unit) id → best chapter-test score, out of TEST_SIZE */
  tests: Record<string, number>;
  /** Math exam variant; null until chosen. */
  program: Program | null;
  /** When the program was last chosen (ms), so the newest choice wins across devices. */
  programAt: number;
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
  programAt: 0,
};

/** How many learned days are remembered (enough for the week strip and streak merges). */
export const MAX_DAYS = 60;

const LESSON_IDS = new Set(ALL_LESSONS.map((l) => l.id));
const UNIT_IDS = new Set(UNITS.map((u) => u.id));
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;
const MAX_XP = 10_000_000;
const MAX_STREAK = 100_000;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
/** The number if it's finite and within [min, max]; otherwise null (dropped, never clamped). */
const inRange = (v: unknown, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : null;
const intInRange = (v: unknown, min: number, max: number) => {
  const n = inRange(v, min, max);
  return n != null && Number.isInteger(n) ? n : null;
};

/** Keep only well-formed values for lessons and chapters that exist; drop everything else. */
export function sanitize(input: unknown): LearnState {
  if (!isObj(input)) return { ...EMPTY_STATE };
  const done: Record<string, number> = {};
  if (isObj(input.done)) {
    for (const [id, v] of Object.entries(input.done)) {
      const accuracy = inRange(v, 0, 1);
      if (LESSON_IDS.has(id) && accuracy != null) done[id] = accuracy;
    }
  }
  const tests: Record<string, number> = {};
  if (isObj(input.tests)) {
    for (const [id, v] of Object.entries(input.tests)) {
      const score = intInRange(v, 0, TEST_SIZE);
      if (UNIT_IDS.has(id) && score != null) tests[id] = score;
    }
  }
  const days = Array.isArray(input.days)
    ? [...new Set(input.days.filter((d): d is string => typeof d === "string" && DAY.test(d)))].sort().slice(-MAX_DAYS)
    : [];
  const todayXp: Record<string, number> = {};
  if (isObj(input.todayXp)) {
    const latest = Object.keys(input.todayXp).filter((d) => DAY.test(d)).sort().at(-1);
    const v = latest ? intInRange(input.todayXp[latest], 0, MAX_XP) : null;
    if (latest && v != null) todayXp[latest] = v;
  }
  const program = input.program === "M1" || input.program === "M2" ? input.program : null;
  return {
    done,
    xp: intInRange(input.xp, 0, MAX_XP) ?? 0,
    streak: intInRange(input.streak, 0, MAX_STREAK) ?? 0,
    lastDay: typeof input.lastDay === "string" && DAY.test(input.lastDay) ? input.lastDay : null,
    days,
    todayXp,
    tests,
    program,
    programAt: program ? (intInRange(input.programAt, 0, Date.now() + DAY_MS) ?? 0) : 0,
  };
}

function maxPerKey(a: Record<string, number>, b: Record<string, number>) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
}

const dayNumber = (d: string) => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / DAY_MS;
const dayString = (n: number) => new Date(n * DAY_MS).toISOString().slice(0, 10);

/**
 * The streak after merging: each side's streak, carried forward over the days
 * learned after it, as long as there is no gap up to the newest learned day.
 * Account at 12 ending yesterday + browser at 1 today = 13.
 */
function mergedStreak(sides: LearnState[], lastDay: string | null, days: Set<string>) {
  if (!lastDay) return 0;
  const to = dayNumber(lastDay);
  let best = 0;
  for (const s of sides) {
    if (!s.lastDay || s.streak === 0) continue;
    const from = dayNumber(s.lastDay);
    let unbroken = true;
    for (let n = from + 1; n <= to && unbroken; n++) unbroken = days.has(dayString(n));
    if (unbroken) best = Math.max(best, s.streak + (to - from));
  }
  return best;
}

/**
 * Combine the progress saved on the server (`stored`) with what a browser just
 * sent (`incoming`). Nothing earned on either side is lost: best score per
 * lesson and test, every learned day, the streak continued across both, the
 * larger XP (it can't be added up: both sides may hold the same lessons), and
 * the most recently chosen program.
 */
export function mergeProgress(stored: LearnState, incoming: LearnState): LearnState {
  const days = [...new Set([...stored.days, ...incoming.days])].sort().slice(-MAX_DAYS);
  const lastDay =
    [stored.lastDay, incoming.lastDay].filter((d): d is string => d != null).sort().at(-1) ?? null;
  const today = [...Object.keys(stored.todayXp), ...Object.keys(incoming.todayXp)].sort().at(-1);
  // A side without a program never overrides one that has it.
  const programFrom = incoming.program && incoming.programAt >= stored.programAt ? incoming : stored.program ? stored : incoming;
  return {
    done: maxPerKey(stored.done, incoming.done),
    tests: maxPerKey(stored.tests, incoming.tests),
    xp: Math.max(stored.xp, incoming.xp),
    streak: mergedStreak([stored, incoming], lastDay, new Set(days)),
    lastDay,
    days,
    todayXp: today
      ? { [today]: Math.max(stored.todayXp[today] ?? 0, incoming.todayXp[today] ?? 0) }
      : {},
    program: programFrom.program,
    programAt: programFrom.programAt,
  };
}
