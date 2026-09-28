"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Inline, Rich } from "./Rich";
import {
  TEST_PASS,
  TEST_SIZE,
  buildTest,
  findLesson,
  findUnit,
  isQuestion,
  unitsFor,
  type Card,
  type Question,
} from "@/lib/content";
import { completeLesson, completeTest, DAILY_GOAL_XP, unitOpen, useLearn } from "@/lib/progress";

// Plays a lesson (teach and ask, missed questions come back once at the end) or
// a chapter test (10 fresh questions, no second chances, 8 to pass).
// Forked from Trading Claude's player, without the mascot and the chart art.

type Picked = number | boolean | null;

/** Option order: shuffled (3+ options), unless order carries meaning. */
function optionOrder(card: Card): number[] {
  if (card.type !== "choice") return [];
  const idx = card.options.map((_, i) => i);
  const fixed =
    card.options.length < 3 || card.options.some((o) => /^(toate|niciuna|ambele)( (variantele|de mai sus))?/i.test(o));
  if (fixed) return idx;
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

/** "2,5" / "2.5" / "−3" / "3/4" / "-7/2" → number. */
export function parseNumber(s: string) {
  const t = s.replace(/\s/g, "").replace(/[−–]/g, "-").replace(",", ".");
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return t === "" ? NaN : Number(t);
}

function judge(card: Question, picked: Picked, input: string): boolean {
  switch (card.type) {
    case "choice":
    case "truefalse":
      return picked === card.answer;
    case "calc": {
      const v = parseNumber(input);
      return Number.isFinite(v) && Math.abs(v - card.answer) <= (card.tolerance ?? 0.001);
    }
  }
}

function answerText(card: Question): string {
  switch (card.type) {
    case "choice":
      return card.options[card.answer];
    case "truefalse":
      return card.answer ? "Adevărat" : "Fals";
    case "calc":
      return card.display ?? `${card.answer.toLocaleString("ro-RO")}${card.unit ? ` ${card.unit}` : ""}`;
  }
}

// ---------------- the step runner, shared by lessons and tests ----------------

interface Outcome {
  card: Question;
  right: boolean;
}

const RIGHT = ["Corect!", "Exact.", "Foarte bine.", "Așa da.", "Perfect."];
const WRONG = ["Nu chiar.", "Aproape.", "Nu e asta."];

function Runner({
  cards,
  kicker,
  retryMissed,
  onFinish,
  exitHref,
}: {
  cards: Card[];
  kicker: string;
  retryMissed: boolean;
  onFinish: (firstTry: Outcome[]) => void;
  exitHref: string;
}) {
  const [queue, setQueue] = useState<Card[]>(cards);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<Picked>(null);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const outcomes = useRef(new Map<Question, boolean>());
  const requeued = useRef(new Set<Question>());
  const inputRef = useRef<HTMLInputElement>(null);

  // Shuffle after mount so server and browser render the same first frame.
  const [orders, setOrders] = useState<Map<Card, number[]> | null>(null);
  useEffect(() => setOrders(new Map(cards.map((c) => [c, optionOrder(c)]))), [cards]);

  const card = queue[pos];
  const q = card && isQuestion(card) ? card : null;
  const correct = useMemo(() => (q && checked ? judge(q, picked, input) : false), [q, checked, picked, input]);
  const canCheck = q ? (q.type === "calc" ? input.trim() !== "" : picked != null) : true;

  useEffect(() => {
    if (q?.type === "calc" && !checked) inputRef.current?.focus({ preventScroll: true });
  }, [q, checked]);

  const advance = useCallback(() => {
    if (pos + 1 >= queue.length) {
      onFinish(cards.filter(isQuestion).map((c) => ({ card: c, right: outcomes.current.get(c) ?? false })));
    } else {
      setPos(pos + 1);
      setPicked(null);
      setInput("");
      setChecked(false);
      window.scrollTo({ top: 0 });
    }
  }, [pos, queue.length, onFinish, cards]);

  const check = useCallback(() => {
    if (!q || !canCheck) return;
    setChecked(true);
    const right = judge(q, picked, input);
    if (!outcomes.current.has(q)) outcomes.current.set(q, right);
    if (!right && retryMissed && !requeued.current.has(q)) {
      requeued.current.add(q);
      setQueue((list) => [...list, q]);
    }
  }, [q, canCheck, picked, input, retryMissed]);

  const primary = () => {
    if (!card) return;
    if (!q || checked) advance();
    else check();
  };

  // Keyboard: 1–4 pick an answer, A/F for adevărat/fals, Enter checks / continues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      const inField = !!el.closest?.("input, textarea");
      if (e.key === "Enter") {
        if ((inField && !checked) || el.closest?.("button, a")) return;
        e.preventDefault();
        primary();
        return;
      }
      if (checked || inField || !q) return;
      if (q.type === "choice") {
        const order = orders?.get(q) ?? q.options.map((_, i) => i);
        const k = Number(e.key);
        if (k >= 1 && k <= order.length) setPicked(order[k - 1]);
      } else if (q.type === "truefalse") {
        if (e.key.toLowerCase() === "a" || e.key === "1") setPicked(true);
        if (e.key.toLowerCase() === "f" || e.key === "2") setPicked(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // A short cheer or nudge, fixed per card so it doesn't flicker on re-render.
  const cheer = useMemo(() => {
    const list = correct ? RIGHT : WRONG;
    return list[(pos * 7 + queue.length) % list.length];
  }, [correct, pos, queue.length]);

  if (!card) return null;
  const order = q?.type === "choice" ? (orders?.get(q) ?? q.options.map((_, i) => i)) : [];
  const retry = pos >= cards.length;

  return (
    <main className="lesson">
      <div className="lesson-top">
        <Link className="icon-btn lesson-close" href={exitHref} aria-label="Ieși din lecție">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </Link>
        <div
          className="lesson-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={queue.length}
          aria-valuenow={pos}
        >
          <i style={{ transform: `scaleX(${pos / queue.length})` }} />
        </div>
        <span className="lesson-count num">
          {pos + 1}/{queue.length}
        </span>
      </div>

      <section className={`glass lesson-card ${q ? "is-question" : "is-learn"}`} key={pos}>
        <p className="lesson-kicker">
          {kicker}
          {retry ? " · încă o încercare" : ""}
        </p>

        {!q ? (
          card.type === "learn" && (
            <>
              <h1 className="lesson-title">
                <Inline text={card.title} />
              </h1>
              <Rich text={card.body} />
            </>
          )
        ) : (
          <>
            <h1 className="lesson-title lesson-prompt">
              <Inline text={q.prompt} />
            </h1>

            {q.type === "calc" && (
              <form
                className={`calc ${checked ? (correct ? "is-right" : "is-wrong") : ""}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  primary();
                }}
              >
                <input
                  ref={inputRef}
                  inputMode="text"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  readOnly={checked}
                  aria-label="Răspunsul tău"
                  placeholder="Răspunsul tău"
                />
                {q.unit && <span className="calc-unit">{q.unit}</span>}
              </form>
            )}
            {q.type === "calc" && !checked && (
              <p className="lesson-hint">Poți scrie și fracții (3/4) sau numere negative (-2).</p>
            )}

            {(q.type === "choice" || q.type === "truefalse") && (
              <div className="answers" role="radiogroup" aria-label="Variante">
                {q.type === "choice"
                  ? order.map((i, k) => (
                      <AnswerButton
                        key={i}
                        n={k + 1}
                        label={q.options[i]}
                        selected={picked === i}
                        state={checked ? (i === q.answer ? "right" : picked === i ? "wrong" : "idle") : "idle"}
                        disabled={checked}
                        onPick={() => setPicked(i)}
                      />
                    ))
                  : ([true, false] as const).map((v, k) => (
                      <AnswerButton
                        key={String(v)}
                        n={k + 1}
                        label={v ? "Adevărat" : "Fals"}
                        selected={picked === v}
                        state={checked ? (v === q.answer ? "right" : picked === v ? "wrong" : "idle") : "idle"}
                        disabled={checked}
                        onPick={() => setPicked(v)}
                      />
                    ))}
              </div>
            )}
          </>
        )}
      </section>

      <div className={`lesson-bar ${checked ? (correct ? "is-right" : "is-wrong") : ""}`}>
        {checked && q && (
          <div className="feedback" role="status">
            <div className="feedback-text">
              <p className="feedback-title">{cheer}</p>
              {!correct && (
                <p className="feedback-answer">
                  Răspuns: <strong><Inline text={answerText(q)} /></strong>
                </p>
              )}
              <p className="feedback-explain">
                <Inline text={q.explain} />
              </p>
            </div>
          </div>
        )}
        <button className="btn btn-primary lesson-btn" onClick={primary} disabled={!!q && !checked && !canCheck}>
          {!q || checked ? "Continuă" : "Verifică"}
        </button>
      </div>
    </main>
  );
}

// ---------------- a lesson ----------------

export default function LessonPlayer({ lessonId }: { lessonId: string }) {
  const { lesson, next, unit } = findLesson(lessonId)!;
  const [result, setResult] = useState<(ReturnType<typeof completeLesson> & { accuracy: number }) | null>(null);
  const home = `/${unit.subject}`;

  const finish = useCallback(
    (outcomes: Outcome[]) => {
      const accuracy = outcomes.length ? outcomes.filter((o) => o.right).length / outcomes.length : 1;
      setResult({ ...completeLesson(lesson.id, accuracy), accuracy });
      window.scrollTo({ top: 0 });
    },
    [lesson.id]
  );

  if (!result) {
    return (
      <Runner
        cards={lesson.cards}
        kicker={`${unit.title} · ${lesson.title}`}
        retryMissed
        onFinish={finish}
        exitHref={home}
      />
    );
  }

  const lastOfUnit = unit.lessons.at(-1)?.id === lesson.id;
  const pct = Math.round(result.accuracy * 100);
  const line =
    result.accuracy === 1
      ? "Perfect! Totul corect din prima."
      : result.accuracy < 0.6
        ? "Gata, dar cu multe greșeli. Merită reluată mâine."
        : lastOfUnit
          ? "Ai terminat lecțiile capitolului. Urmează testul."
          : result.todayXp >= DAILY_GOAL_XP
            ? "Obiectivul de azi e atins."
            : "Încă o lecție bifată.";

  return (
    <main className="lesson">
      <section className="glass lesson-done" aria-live="polite">
        <p className="lesson-done-eyebrow">Lecție terminată</p>
        <h1 className="lesson-done-title">{lesson.title}</h1>
        <p className="test-verdict">{line}</p>
        <div className="done-stats">
          <div className="done-stat">
            <span className="done-value num">+{result.earned}</span>
            <span className="done-label">XP</span>
          </div>
          <div className="done-stat">
            <span className="done-value num">{pct}%</span>
            <span className="done-label">corect din prima</span>
          </div>
          <div className={`done-stat ${result.streakGrew ? "is-hot" : ""}`}>
            <span className="done-value num">
              <Flame /> {result.streak}
            </span>
            <span className="done-label">{result.streak === 1 ? "zi la rând" : "zile la rând"}</span>
          </div>
        </div>
        <Goal todayXp={result.todayXp} />
        <div className="done-actions">
          {lastOfUnit ? (
            <Link className="btn btn-primary" href={`/test/${unit.id}`}>
              Dă testul capitolului
            </Link>
          ) : next ? (
            <Link className="btn btn-primary" href={`/lectie/${next.id}`}>
              Următoarea: {next.title}
            </Link>
          ) : null}
          <Link className="text-btn" href={home}>
            Înapoi la lecții
          </Link>
        </div>
      </section>
    </main>
  );
}

// ---------------- a chapter test ----------------

export function ChapterTest({ unitId }: { unitId: string }) {
  const unit = findUnit(unitId)!;
  const [round, setRound] = useState(0);
  const [cards, setCards] = useState<Question[] | null>(null);
  const [result, setResult] = useState<{ outcomes: Outcome[]; earned: number } | null>(null);
  const s = useLearn();
  const home = `/${unit.subject}`;

  // The questions are random: pick them in the browser only.
  useEffect(() => {
    setCards(buildTest(unit));
    setResult(null);
  }, [unit, round]);

  const finish = useCallback(
    (outcomes: Outcome[]) => {
      const saved = completeTest(unit.id, outcomes.filter((o) => o.right).length);
      setResult({ outcomes, earned: saved.earned });
      window.scrollTo({ top: 0 });
    },
    [unit.id]
  );

  if (!cards || !s) return <main className="lesson" aria-busy="true" />;

  const units = unitsFor(unit.subject, s.program);
  const index = units.findIndex((u) => u.id === unit.id);
  const next = units[index + 1] ?? null;
  const ready = index >= 0 && unitOpen(s, units.map((u) => u.id), index) && unit.lessons.every((l) => l.id in s.done);

  if (!ready && !result) {
    return (
      <main className="lesson">
        <section className="glass lesson-done">
          <p className="lesson-done-eyebrow">Testul capitolului {index + 1}</p>
          <h1 className="lesson-done-title">Încă nu e deschis</h1>
          <p className="test-verdict">
            Termină toate lecțiile din „{unit.title}”
            {index > 0 ? ` (și testul capitolului ${index})` : ""} mai întâi: testul întreabă din toate.
          </p>
          <div className="done-actions">
            <Link className="btn btn-primary" href={home}>
              Înapoi la lecții
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!result) {
    return (
      <Runner
        key={round}
        cards={cards}
        kicker={`Test · ${unit.title}`}
        retryMissed={false}
        onFinish={finish}
        exitHref={home}
      />
    );
  }

  const score = result.outcomes.filter((o) => o.right).length;
  const passed = score >= TEST_PASS;
  const missed = result.outcomes.filter((o) => !o.right);
  return (
    <main className="lesson">
      <section className={`glass lesson-done test-done ${passed ? "is-pass" : "is-fail"}`} aria-live="polite">
        <p className="lesson-done-eyebrow">Testul capitolului {index + 1}</p>
        <h1 className="lesson-done-title">{passed ? `${unit.title}: promovat` : "Nu de data asta"}</h1>
        <p className="test-score num">
          {score}
          <span>/{TEST_SIZE}</span>
        </p>
        <p className="test-verdict">
          {passed
            ? next
              ? `Ai deschis capitolul ${index + 2}: ${next.title}.`
              : "Ăsta a fost ultimul capitol de până acum."
            : `Ai nevoie de ${TEST_PASS} ca să treci. Uită-te la ce ai greșit, apoi încearcă din nou: primești alte întrebări.`}
        </p>
        {result.earned > 0 && <p className="test-xp num">+{result.earned} XP</p>}

        {missed.length > 0 && (
          <div className="missed">
            <h2 className="missed-title">Ce ai greșit</h2>
            <ol>
              {missed.map(({ card }, i) => (
                <li key={i}>
                  <p className="missed-q">
                    <Inline text={card.prompt} />
                  </p>
                  <p className="missed-a">
                    Răspuns: <strong><Inline text={answerText(card)} /></strong>
                  </p>
                  <p className="missed-why">
                    <Inline text={card.explain} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="done-actions">
          {passed ? (
            next ? (
              <Link className="btn btn-primary" href={`/lectie/${next.lessons[0].id}`}>
                Începe: {next.title}
              </Link>
            ) : (
              <Link className="btn btn-primary" href={home}>
                Înapoi la lecții
              </Link>
            )
          ) : (
            <button className="btn btn-primary" onClick={() => setRound((r) => r + 1)}>
              Încearcă din nou
            </button>
          )}
          {(!passed || next) && (
            <Link className="text-btn" href={home}>
              {passed ? "Înapoi la lecții" : "Recitește lecțiile"}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

// ---------------- small pieces ----------------

function Goal({ todayXp }: { todayXp: number }) {
  return (
    <div className="goal">
      <div className="goal-bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${Math.min(1, todayXp / DAILY_GOAL_XP)})` }} />
      </div>
      <p className="goal-text">
        {todayXp >= DAILY_GOAL_XP
          ? "Obiectivul zilei e atins: ne vedem mâine."
          : `${todayXp} / ${DAILY_GOAL_XP} XP din obiectivul de azi.`}
      </p>
    </div>
  );
}

function AnswerButton({
  n,
  label,
  selected,
  state,
  disabled,
  onPick,
}: {
  n: number;
  label: string;
  selected: boolean;
  state: "idle" | "right" | "wrong";
  disabled: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`answer ${selected ? "is-selected" : ""} is-${state}`}
      onClick={onPick}
      disabled={disabled}
    >
      <span className="answer-key" aria-hidden="true">
        {n}
      </span>
      <span className="answer-label">
        <Inline text={label} />
      </span>
    </button>
  );
}

export function Flame() {
  return (
    <svg className="flame" width="0.9em" height="0.9em" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8.2 1.2c.4 2.3-1 3.4-2.1 4.7C5 7.1 4 8.4 4 10.3 4 12.9 5.9 15 8.2 15s4-1.8 4-4.4c0-1.6-.7-2.9-1.5-3.8-.2 1-.8 1.7-1.6 2 .4-2.9-.4-5.4-.9-7.6z"
        fill="currentColor"
      />
    </svg>
  );
}
