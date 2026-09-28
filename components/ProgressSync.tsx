"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { CHANGED_EVENT, readLearn, replaceLearn, type LearnState } from "@/lib/progress";

// Mirrors this browser's progress to the signed-in account. Renders nothing.
// - On sign-in (or opening the site signed in): send what's here, get back the
//   merged account progress, keep that. First sign-in = local progress imported.
// - After every change: send it (debounced). Offline? It stays local and goes
//   up with the next change or when the connection comes back.

async function push(state: LearnState, keepalive = false): Promise<LearnState | null> {
  try {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress: state }),
      keepalive,
    });
    if (!res.ok) return null;
    return ((await res.json()) as { progress: LearnState }).progress;
  } catch {
    return null;
  }
}

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

    const sync = async () => {
      const sent = version.current;
      const merged = await push(readLearn());
      if (!merged) {
        dirty.current = true;
        return;
      }
      dirty.current = false;
      // Only adopt the server's copy if nothing changed here meanwhile;
      // otherwise the newer local change will be pushed next anyway.
      if (version.current === sent) replaceLearn(merged);
    };

    if (synced.current !== userId) {
      synced.current = userId;
      void sync();
    }

    const onChange = () => {
      version.current += 1;
      dirty.current = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(sync, 600);
    };
    const onOnline = () => {
      if (dirty.current) void sync();
    };
    const onHide = () => {
      if (document.visibilityState === "hidden" && dirty.current) void push(readLearn(), true);
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
