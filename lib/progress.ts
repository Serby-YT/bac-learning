"use client";

import { useEffect, useState } from "react";
import type { Program } from "./content/types";
import { EMPTY_STATE, MAX_DAYS, type LearnState } from "./learnState";

// Progress lives in this browser (localStorage) so anyone can learn without an
// account. When signed in, components/ProgressSync.tsx mirrors it to the server:
// every change made here fires CHANGED_EVENT, which the sync pushes.
export type { LearnState };

const KEY = "bac-progress-v1";
/** Which account this browser's copy belongs to (set after a sync; absent = not yet in any account). */
const OWNER_KEY = "bac-progress-owner";
const EVENT = "bac-progress";
/** Fired only for changes the student made here (not for data pulled from the server). */
export const CHANGED_EVENT = "bac-progress-changed";

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
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return s ? { ...EMPTY_STATE, ...s } : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

/** Replace this browser's copy without counting it as a change (e.g. after a sync). */
export function replaceLearn(next: LearnState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // private mode — progress just won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}

function save(next: LearnState) {
  replaceLearn(next);
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

/** Forget this browser's copy (on sign-out: the account keeps it). */
export function clearLearn() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(OWNER_KEY);
  } catch {
    // nothing stored
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
    days: s.days.includes(today) ? s.days : [...s.days, today].slice(-MAX_DAYS),
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
  save({ ...readLearn(), program, programAt: Date.now() });
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

export function learnOwner(): string | null {
  try {
    return localStorage.getItem(OWNER_KEY);
  } catch {
    return null;
  }
}

export function setLearnOwner(userId: string) {
  try {
    localStorage.setItem(OWNER_KEY, userId);
  } catch {
    // private mode — ownership just won't be remembered
  }
}
