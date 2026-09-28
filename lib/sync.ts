"use client";

import { learnOwner, readLearn, type LearnState } from "./progress";

// Talking to /api/progress from the browser. Used by components/ProgressSync
// (automatic sync) and by the account page (last push before signing out).

async function call(init?: RequestInit): Promise<LearnState | null> {
  try {
    const res = await fetch("/api/progress", init);
    if (!res.ok) return null;
    return ((await res.json()) as { progress: LearnState }).progress;
  } catch {
    return null; // offline or server down: the browser copy stays as it is
  }
}

/** Send this browser's progress; returns the merged account progress, or null if it didn't get through. */
export function pushProgress(state: LearnState = readLearn(), keepalive = false) {
  return call({
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress: state }),
    keepalive,
  });
}

/**
 * The account's progress, reconciled with this browser. Progress made here
 * without an account (or already in this account) is merged in; progress that
 * belongs to a *different* account (someone else used this browser) is not
 * pushed, just replaced by this account's.
 */
export function syncWithAccount(userId: string) {
  const owner = learnOwner();
  return owner && owner !== userId ? call() : pushProgress();
}
