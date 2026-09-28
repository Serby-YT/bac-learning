// Every chapter of every subject. Each lesson is ~10 steps that alternate between
// teaching and asking; each chapter ends with a 10-question test that must be
// passed (8/10) to unlock the next chapter of the same subject.

import type { Program, Question, Card, Subject, SubjectId, Unit } from "./types";
import { progresii } from "./mate-progresii";
import { functii } from "./mate-functii";
import { logaritmi } from "./mate-logaritmi";
import { complexe } from "./mate-complexe";
import { combinatorica } from "./mate-combinatorica";
import { geometrie } from "./mate-geometrie";
import { trigonometrie } from "./mate-trigonometrie";
import { curente } from "./ro-curente";
import { poezie } from "./ro-poezie";

export type * from "./types";

export const SUBJECTS: Subject[] = [
  {
    id: "matematica",
    title: "Matematică",
    blurb: "Subiectul I pas cu pas: formule, metode și capcanele din barem.",
  },
  {
    id: "romana",
    title: "Română",
    blurb: "Curente, opere canonice și ce trebuie să știi pentru eseu.",
  },
];

/** In order: each subject's chapters unlock one after another. */
export const UNITS: Unit[] = [
  // matematică
  progresii,
  functii,
  logaritmi,
  complexe,
  combinatorica,
  geometrie,
  trigonometrie,
  // română
  curente,
  poezie,
];

export const TEST_SIZE = 10;
export const TEST_PASS = 8;

export const findSubject = (id: string) => SUBJECTS.find((s) => s.id === id) ?? null;

/** The chapters one student sees: their subject, and (for math) their program. */
export function unitsFor(subject: SubjectId, program: Program | null): Unit[] {
  return UNITS.filter(
    (u) => u.subject === subject && (!u.programs || program == null || u.programs.includes(program))
  );
}

export const ALL_LESSONS = UNITS.flatMap((u) => u.lessons.map((l) => ({ ...l, unitId: u.id })));

export function findLesson(id: string) {
  const i = ALL_LESSONS.findIndex((l) => l.id === id);
  if (i < 0) return null;
  const unit = UNITS.find((u) => u.id === ALL_LESSONS[i].unitId)!;
  const li = unit.lessons.findIndex((l) => l.id === id);
  return { lesson: ALL_LESSONS[i], unit, next: unit.lessons[li + 1] ?? null };
}

export function findUnit(id: string) {
  return UNITS.find((u) => u.id === id) ?? null;
}

export const isQuestion = (c: Card): c is Question => c.type !== "learn";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A fresh chapter test, drawn only from the chapter's own test pool (never the
 * lessons' questions): an even share from every lesson, then random others.
 * No question appears twice. Browser only (random).
 */
export function buildTest(unit: Unit): Question[] {
  const seen = new Set<string>();
  const pool = shuffle(unit.test).filter((q) => !seen.has(q.prompt) && !!seen.add(q.prompt));
  const perLesson = Math.floor(TEST_SIZE / unit.lessons.length);
  const picked: Question[] = [];
  for (const l of unit.lessons) picked.push(...pool.filter((q) => q.lesson === l.id).slice(0, perLesson));
  for (const q of pool) {
    if (picked.length >= TEST_SIZE) break;
    if (!picked.includes(q)) picked.push(q);
  }
  return shuffle(picked);
}
