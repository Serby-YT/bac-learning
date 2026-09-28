"use client";

import { useEffect, useState } from "react";
import type { Program } from "./content/types";

// Progress, kept in this browser for now (stage 1). Stage 2 moves it to the
// server behind a login; the shape stays the same so it can be imported.
export interface LearnState {
  /** lessonId → best accuracy (0–1) */
  done: Record<string, number>;
  xp: number;
  streak: number;
  /** yyyy-mm-dd (local) of the last day a lesson was finished */
  lastDay: string | null;
  /** local days with at least one finished lesson, newest last (max 60) */
  days: string[];
  /** XP earned per day — only today's entry is kept */
  todayXp: Record<string, number>;
  /** chapter (unit) id → best chapter-test score, out of TEST_SIZE */
  tests: Record<string, number>;
  /** Math exam variant; null until chosen. */
  program: Program | null;
}

const KEY = "bac-progress-v1";
const EVENT = "bac-progress";
const EMPTY: LearnState = {
  done: {},
  xp: 0,
  streak: 0,
  lastDay: null,
  days: [],
  todayXp: {},
  tests: {},
  program: null,
};

export const XP_LESSON = 10;
export const XP_PERFECT = 5;
export const XP_REPLAY = 5;
export const XP_TEST = 30;
export const DAILY_GOAL_XP = 20;
/** Chapter tests: 8 of 10 to pass (kept in sync with lib/content). */
const PASS = 8;

export function localDay(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDay(d);
}

export function readLearn(): LearnState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return s ? { ...EMPTY, ...s } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(next: LearnState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // private mode — progress just won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}

/** The streak as it stands today: it only survives if you learned today or yesterday. */
export function liveStreak(s: LearnState) {
  return s.lastDay === localDay() || s.lastDay === yesterday() ? s.streak : 0;
}

export function xpToday(s: LearnState) {
  return s.todayXp[localDay()] ?? 0;
}

/** Save a new state after an activity worth `earned` XP, updating the streak. */
function record(s: LearnState, earned: number, patch: Partial<LearnState>) {
  const today = localDay();
  const prevStreak = liveStreak(s);
  const newDay = s.lastDay !== today;
  const next: LearnState = {
    ...s,
    ...patch,
    xp: s.xp + earned,
    streak: newDay ? prevStreak + 1 : Math.max(prevStreak, 1),
    lastDay: today,
    days: s.days.includes(today) ? s.days : [...s.days, today].slice(-60),
    todayXp: { [today]: (s.todayXp[today] ?? 0) + earned },
  };
  save(next);
  return { earned, streak: next.streak, streakGrew: newDay, todayXp: next.todayXp[today] };
}

/** Record a finished lesson. Returns what was earned, for the results screen. */
export function completeLesson(id: string, accuracy: number) {
  const s = readLearn();
  const first = !(id in s.done);
  const earned = first ? XP_LESSON + (accuracy === 1 ? XP_PERFECT : 0) : XP_REPLAY;
  return { ...record(s, earned, { done: { ...s.done, [id]: Math.max(s.done[id] ?? 0, accuracy) } }), first };
}

/** Record a chapter test. XP only for a pass (full XP the first time). */
export function completeTest(unitId: string, correct: number) {
  const s = readLearn();
  const passed = correct >= PASS;
  const firstPass = passed && (s.tests[unitId] ?? 0) < PASS;
  const earned = firstPass ? XP_TEST : passed ? XP_REPLAY : 0;
  const best = Math.max(s.tests[unitId] ?? 0, correct);
  return { ...record(s, earned, { tests: { ...s.tests, [unitId]: best } }), passed, firstPass, best };
}

export function setProgram(program: Program) {
  save({ ...readLearn(), program });
}

export const testPassed = (s: LearnState | null, unitId: string) => (s?.tests?.[unitId] ?? 0) >= PASS;

/** A chapter opens once the previous chapter's test is passed (the first is always open). */
export function unitOpen(s: LearnState | null, unitIds: string[], index: number) {
  return index === 0 || testPassed(s, unitIds[index - 1]);
}

export function useLearn(): LearnState | null {
  const [state, setState] = useState<LearnState | null>(null);
  useEffect(() => {
    const sync = () => setState(readLearn());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}
