// The shape of every lesson. Text fields accept **bold** and $inline math$
// (KaTeX, e.g. "$a_n = a_1 + (n-1)r$"). Paragraphs are split by a blank line.

export type SubjectId = "matematica" | "romana";

/** Math exam variants. M1 = mate-info, M2 = științe ale naturii. */
export type Program = "M1" | "M2";

export type Card =
  /** Teaching step. */
  | { type: "learn"; title: string; body: string }
  | { type: "choice"; prompt: string; options: string[]; answer: number; explain: string }
  | { type: "truefalse"; prompt: string; answer: boolean; explain: string }
  /** Type a number (fractions like 3/4 and negatives are fine); right if within `tolerance`. */
  | {
      type: "calc";
      prompt: string;
      answer: number;
      tolerance?: number;
      unit?: string;
      /** How to show the answer when it isn't a tidy number, e.g. "$\\frac{3}{4}$". */
      display?: string;
      explain: string;
    };

/** A question. In a chapter test pool, `lesson` names the lesson it checks, so a test covers every lesson. */
export type Question = Exclude<Card, { type: "learn" }> & { lesson?: string };

export interface Lesson {
  id: string;
  title: string;
  cards: Card[];
}

export interface Unit {
  id: string;
  subject: SubjectId;
  title: string;
  blurb: string;
  /** Which math programs study this chapter. Missing = everyone (and always for Română). */
  programs?: Program[];
  /** Where it shows up in the real exam, e.g. "Subiectul I · item 1". */
  examRef?: string;
  lessons: Lesson[];
  /** Extra questions that only appear in the chapter test. */
  test: Question[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  blurb: string;
}
