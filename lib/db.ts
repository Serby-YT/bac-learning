import "server-only";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

// One SQLite file for accounts (Better Auth's tables) and progress (ours).
// node:sqlite is built into Node, so the bundle built on the Mac runs unchanged
// on the Linux server — no native module to recompile.

// turbopackIgnore: a runtime path, not a file to bundle.
const path = resolve(/*turbopackIgnore: true*/ process.env.DATABASE_PATH ?? "./data/bac.sqlite");

declare global {
  // Reused across hot reloads in dev, so we don't open a new handle on every edit.
  var __bacDb: DatabaseSync | undefined;
}

function open() {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;");
  db.exec(`CREATE TABLE IF NOT EXISTS progress (
    user_id    TEXT PRIMARY KEY,
    data       TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`);
  return db;
}

export const db: DatabaseSync = globalThis.__bacDb ?? (globalThis.__bacDb = open());

export function readProgress(userId: string): unknown | null {
  const row = db.prepare("SELECT data FROM progress WHERE user_id = ?").get(userId) as { data: string } | undefined;
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch {
    return null;
  }
}

export function writeProgress(userId: string, data: unknown) {
  db.prepare(
    `INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).run(userId, JSON.stringify(data), Date.now());
}

export function deleteProgress(userId: string) {
  db.prepare("DELETE FROM progress WHERE user_id = ?").run(userId);
}
