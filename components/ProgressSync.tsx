"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { CHANGED_EVENT, replaceLearn, setLearnOwner, type LearnState } from "@/lib/progress";
import { pushProgress, syncWithAccount } from "@/lib/sync";

// Mirrors this browser's progress to the signed-in account. Renders nothing.
// - On sign-in (or opening the site signed in): reconcile with the account
//   (lib/sync.ts). First sign-in = the browser's progress is imported.
// - After every change: send it (debounced). Offline? It stays local and goes
//   up with the next change, when the connection comes back, or on next visit.

export default function ProgressSync() {
  const { data } = useSession();
  const userId = data?.user.id ?? null;
  const synced = useRef<string | null>(null);
  const version = useRef(0); // bumps on every local change
  const dirty = useRef(false);

  useEffect(() => {
    if (!userId) {
      synced.current = null;
      return;
    }
    let timer: ReturnType<typeof setTimeout> | null = null;

    // Adopt the server's copy only if nothing changed here meanwhile;
    // otherwise the newer local change will be pushed next anyway.
    const adopt = (merged: LearnState | null, sentAt: number) => {
      if (!merged) {
        dirty.current = true;
        return;
      }
      dirty.current = false;
      if (version.current === sentAt) replaceLearn(merged);
      setLearnOwner(userId);
    };

    if (synced.current !== userId) {
      synced.current = userId;
      const sentAt = version.current;
      void syncWithAccount(userId).then((m) => adopt(m, sentAt));
    }

    const push = () => {
      const sentAt = version.current;
      void pushProgress().then((m) => adopt(m, sentAt));
    };
    const onChange = () => {
      version.current += 1;
      dirty.current = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(push, 600);
    };
    const onOnline = () => {
      if (dirty.current) push();
    };
    const onHide = () => {
      if (document.visibilityState === "hidden" && dirty.current) void pushProgress(undefined, true);
    };
    window.addEventListener(CHANGED_EVENT, onChange);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(CHANGED_EVENT, onChange);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [userId]);

  return null;
}
