"use client";

import Link from "next/link";
import { TEST_PASS, TEST_SIZE, findSubject, unitsFor, type Program, type SubjectId } from "@/lib/content";
import {
  DAILY_GOAL_XP,
  liveStreak,
  localDay,
  setProgram,
  testPassed,
  unitOpen,
  useLearn,
  xpToday,
} from "@/lib/progress";
import { Flame } from "./LessonPlayer";

// One subject's winding path of lessons (forked from Trading Claude's Learn page).

const WIND = [0, 56, 84, 56, 0, -56, -84, -56];

const PROGRAMS: { id: Program; label: string; note: string }[] = [
  { id: "M1", label: "M1", note: "mate-info" },
  { id: "M2", label: "M2", note: "științe ale naturii" },
];

export default function SubjectPath({ subjectId }: { subjectId: SubjectId }) {
  const subject = findSubject(subjectId)!;
  const s = useLearn();
  const done = s?.done ?? {};
  const program = s?.program ?? null;
  const isMath = subjectId === "matematica";
  const units = unitsFor(subjectId, program);
  const unitIds = units.map((u) => u.id);
  const lessons = units.flatMap((u) => u.lessons);
  const doneCount = lessons.filter((l) => l.id in done).length;
  const passedCount = units.filter((u) => testPassed(s, u.id)).length;
  const streak = s ? liveStreak(s) : 0;
  const today = s ? xpToday(s) : 0;
  const learnedToday = s?.lastDay === localDay();

  // What to do next: the first open chapter that isn't passed yet —
  // its first unfinished lesson, or its test once every lesson is done.
  const current = units.findIndex((u, i) => unitOpen(s, unitIds, i) && !testPassed(s, u.id));
  const currentUnit = current >= 0 ? units[current] : null;
  const nextLesson = currentUnit?.lessons.find((l) => !(l.id in done)) ?? null;
  const nextIsTest = !!currentUnit && !nextLesson;
  const nothingYet = doneCount === 0;

  const week = Array.from({ length: 7 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - k));
    return { day: localDay(d), label: d.toLocaleDateString("ro-RO", { weekday: "narrow" }) };
  });

  let flat = -1;

  return (
    <main className="learn">
      <header className="learn-head">
        <h1>{subject.title}</h1>
        <p className="home-sub">
          {subject.blurb} Fiecare lecție durează cam cinci minute. Termini un capitol, treci testul ({TEST_PASS} din{" "}
          {TEST_SIZE}) și se deschide următorul.
        </p>
      </header>

      <div className="learn-layout">
        <aside className="learn-side">
          {isMath && s && (
            <section className="glass widget" aria-label="Programa ta">
              <div className="widget-head">
                <h2 className="widget-title">Programa ta</h2>
                <span className="widget-meta">{program ? `${program} ales` : "alege una"}</span>
              </div>
              <div className="program-pick" role="radiogroup" aria-label="Programa de matematică">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={program === p.id}
                    className="program-btn"
                    onClick={() => setProgram(p.id)}
                  >
                    <span className="program-label">{p.label}</span>
                    <span className="program-note">{p.note}</span>
                  </button>
                ))}
              </div>
              <p className="widget-foot">Capitolele care nu sunt în programa ta se ascund. Poți schimba oricând.</p>
            </section>
          )}

          <section className="glass widget learn-stats" aria-label="Progresul tău">
            <div className="learn-stat">
              <span className={`learn-stat-value num ${learnedToday ? "is-hot" : ""}`}>
                <Flame /> {streak}
              </span>
              <span className="learn-stat-label">zile la rând</span>
            </div>
            <div className="learn-stat">
              <span className="learn-stat-value num">{s?.xp ?? 0}</span>
              <span className="learn-stat-label">XP total</span>
            </div>
            <div className="learn-stat">
              <span className="learn-stat-value num">
                {doneCount}/{lessons.length}
              </span>
              <span className="learn-stat-label">lecții</span>
            </div>
            <div className="learn-stat">
              <span className="learn-stat-value num">
                {passedCount}/{units.length}
              </span>
              <span className="learn-stat-label">capitole</span>
            </div>
          </section>

          <section className="glass widget" aria-label="Obiectivul de azi">
            <div className="widget-head">
              <h2 className="widget-title">Obiectivul de azi</h2>
              <span className="widget-meta num">
                {Math.min(today, DAILY_GOAL_XP)}/{DAILY_GOAL_XP} XP
              </span>
            </div>
            <div className="goal-bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${Math.min(1, today / DAILY_GOAL_XP)})` }} />
            </div>
            <ol className="week" aria-label="Săptămâna asta">
              {week.map((w) => (
                <li
                  key={w.day}
                  className={`${s?.days.includes(w.day) ? "is-done" : ""} ${w.day === localDay() ? "is-today" : ""}`}
                >
                  <i aria-hidden="true" />
                  <span>{w.label}</span>
                </li>
              ))}
            </ol>
            <p className="widget-foot">Două lecții pe zi ating obiectivul.</p>
          </section>

          {s && currentUnit && (
            <Link
              className="glass widget up-next"
              href={nextIsTest ? `/test/${currentUnit.id}` : `/lectie/${nextLesson!.id}`}
            >
              <span className="widget-meta">
                {nothingYet ? "Începe de aici" : nextIsTest ? `Testul capitolului ${current + 1}` : "Urmează"}
              </span>
              <span className="up-next-title">
                {nextIsTest ? `${currentUnit.title}: ${TEST_SIZE} întrebări` : nextLesson!.title}
              </span>
              <span className="btn btn-primary up-next-btn">
                {nothingYet ? "Începe" : nextIsTest ? "Dă testul" : "Continuă"}
              </span>
            </Link>
          )}
        </aside>

        <div className="units">
          {units.map((u, ui) => {
            const unitIsOpen = s != null && unitOpen(s, unitIds, ui);
            const unitDone = u.lessons.filter((l) => l.id in done).length;
            const allDone = unitDone === u.lessons.length;
            const passed = testPassed(s, u.id);
            const best = s?.tests?.[u.id];
            const testOpen = unitIsOpen && allDone;
            const testIsNext = nextIsTest && current === ui;
            return (
              <section
                key={u.id}
                className={`glass unit ${unitIsOpen ? "" : "is-locked"}`}
                aria-labelledby={`unit-${u.id}`}
              >
                <header className="unit-head">
                  <div>
                    <p className="unit-eyebrow">
                      Capitolul {ui + 1}
                      {u.examRef ? ` · ${u.examRef}` : ""}
                      {u.programs ? ` · doar ${u.programs.join(", ")}` : ""}
                    </p>
                    <h2 id={`unit-${u.id}`} className="unit-title">
                      {u.title}
                    </h2>
                    <p className="card-sub">{u.blurb}</p>
                    {s && !unitIsOpen && (
                      <p className="unit-lock-note">
                        <Lock /> Treci testul capitolului {ui} ca să deschizi capitolul ăsta.
                      </p>
                    )}
                  </div>
                  <span className="unit-count num">
                    {unitDone}/{u.lessons.length}
                  </span>
                </header>

                <ol className="path">
                  {u.lessons.map((l, li) => {
                    flat += 1;
                    const isDone = l.id in done;
                    const open = unitIsOpen && (li === 0 || u.lessons[li - 1].id in done || isDone);
                    const isNext = nextLesson?.id === l.id;
                    const offset = WIND[flat % WIND.length];
                    return (
                      <li key={l.id} className="path-step" style={{ transform: `translateX(${offset}px)` }}>
                        {open ? (
                          <Link
                            href={`/lectie/${l.id}`}
                            className={`node ${isDone ? "is-done" : ""} ${isNext ? "is-next" : ""}`}
                            aria-label={`${l.title}${isDone ? " (terminată)" : ""}`}
                          >
                            {isDone ? <Check /> : <span className="num">{li + 1}</span>}
                          </Link>
                        ) : (
                          <span className="node is-locked" aria-label={`${l.title} (blocată)`}>
                            <Lock />
                          </span>
                        )}
                        <span className={`node-label ${open ? "" : "is-locked"}`}>{l.title}</span>
                      </li>
                    );
                  })}

                  {(() => {
                    flat += 1;
                    const offset = WIND[flat % WIND.length];
                    return (
                      <li className="path-step is-test" style={{ transform: `translateX(${offset}px)` }}>
                        {testOpen ? (
                          <Link
                            href={`/test/${u.id}`}
                            className={`node is-test ${passed ? "is-done" : ""} ${testIsNext ? "is-next" : ""}`}
                            aria-label={`Testul capitolului ${ui + 1}${passed ? ` (promovat, maxim ${best}/${TEST_SIZE})` : ""}`}
                          >
                            {passed ? <Check /> : <Trophy />}
                          </Link>
                        ) : (
                          <span
                            className="node is-test is-locked"
                            aria-label={`Testul capitolului ${ui + 1} (blocat: termină întâi toate lecțiile)`}
                          >
                            <Trophy />
                          </span>
                        )}
                        <span className={`node-label ${testOpen ? "" : "is-locked"}`}>Testul capitolului</span>
                        <span className="node-sub num">
                          {passed
                            ? `Promovat · maxim ${best}/${TEST_SIZE}`
                            : best != null && testOpen
                              ? `Maxim ${best}/${TEST_SIZE} · ai nevoie de ${TEST_PASS}`
                              : `${TEST_SIZE} întrebări · ${TEST_PASS} ca să treci`}
                        </span>
                      </li>
                    );
                  })()}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.4 6.6 11.4 12.6 4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Lock() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="7" rx="1.6" fill="currentColor" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Trophy() {
  return (
    <svg width="30" height="30" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.5 2.5h7v3.2a3.5 3.5 0 0 1-7 0V2.5zM4.5 3.5H2.6v1.2A2 2 0 0 0 4.6 6.7M11.5 3.5h1.9v1.2a2 2 0 0 1-2 2M8 9.2v2.3M5.6 13.5h4.8M6.4 11.5h3.2v2H6.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
