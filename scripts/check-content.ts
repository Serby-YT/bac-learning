// Checks every lesson and test question before it reaches a student:
// unique ids, answer indexes that exist, formulas KaTeX can draw, test pools
// big enough to fill a test with an even share per lesson.
// Run: npm run check

import katex from "katex";
import { TEST_SIZE, UNITS, isQuestion } from "../lib/content/index";
import type { Card, Question } from "../lib/content/types";

const problems: string[] = [];
const fail = (where: string, what: string) => problems.push(`${where}: ${what}`);

function texts(c: Card | Question): string[] {
  switch (c.type) {
    case "learn":
      return [c.title, c.body];
    case "choice":
      return [c.prompt, c.explain, ...c.options];
    case "truefalse":
      return [c.prompt, c.explain];
    case "calc":
      return [c.prompt, c.explain, ...(c.display ? [c.display] : [])];
  }
}

function checkMath(where: string, text: string) {
  if ((text.match(/\$/g) ?? []).length % 2 !== 0) fail(where, `odd number of $ in: ${text.slice(0, 60)}`);
  for (const m of text.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g)) {
    const tex = m[1] ?? m[2];
    try {
      katex.renderToString(tex, { throwOnError: true, strict: false });
    } catch (e) {
      fail(where, `KaTeX: ${(e as Error).message.split("\n")[0]}`);
    }
  }
}

function checkCard(where: string, c: Card | Question) {
  for (const t of texts(c)) checkMath(where, t);
  if (c.type === "choice") {
    if (c.options.length < 2) fail(where, "choice needs 2+ options");
    if (!Number.isInteger(c.answer) || c.answer < 0 || c.answer >= c.options.length) fail(where, "answer index out of range");
    if (new Set(c.options).size !== c.options.length) fail(where, "duplicate options");
  }
  if (c.type === "calc" && !Number.isFinite(c.answer)) fail(where, "calc answer is not a number");
}

const lessonIds = new Set<string>();
const unitIds = new Set<string>();
let cards = 0;
let questions = 0;

for (const u of UNITS) {
  if (unitIds.has(u.id)) fail(u.id, "duplicate unit id");
  unitIds.add(u.id);
  for (const l of u.lessons) {
    if (lessonIds.has(l.id)) fail(l.id, "duplicate lesson id");
    lessonIds.add(l.id);
    if (!l.cards.some(isQuestion)) fail(l.id, "lesson has no questions");
    l.cards.forEach((c, i) => {
      cards++;
      checkCard(`${l.id}#${i + 1}`, c);
    });
  }
  const own = new Set(u.lessons.map((l) => l.id));
  const perLesson = Math.floor(TEST_SIZE / u.lessons.length);
  if (u.test.length < TEST_SIZE) fail(u.id, `test pool has ${u.test.length}, needs ${TEST_SIZE}`);
  for (const l of u.lessons) {
    const n = u.test.filter((q) => q.lesson === l.id).length;
    if (n < perLesson) fail(u.id, `test pool has ${n} questions for ${l.id}, needs ${perLesson}`);
  }
  const prompts = new Set<string>();
  u.test.forEach((q, i) => {
    questions++;
    const where = `${u.id} test #${i + 1}`;
    if (q.lesson && !own.has(q.lesson)) fail(where, `unknown lesson ${q.lesson}`);
    if (prompts.has(q.prompt)) fail(where, "duplicate prompt in test pool");
    prompts.add(q.prompt);
    checkCard(where, q);
  });
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${UNITS.length} chapters, ${lessonIds.size} lessons, ${cards} lesson cards, ${questions} test questions — all OK`);
