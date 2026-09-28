"use client";

import Link from "next/link";
import { SUBJECTS, unitsFor } from "@/lib/content";
import { DAILY_GOAL_XP, liveStreak, localDay, testPassed, unitOpen, useLearn, xpToday } from "@/lib/progress";
import { Flame } from "@/components/LessonPlayer";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const s = useLearn();
  const { data: session, isPending } = useSession();
  const hasProgress = !!s && (s.xp > 0 || Object.keys(s.done).length > 0);
  const streak = s ? liveStreak(s) : 0;
  const today = s ? xpToday(s) : 0;
  const learnedToday = s?.lastDay === localDay();

  return (
    <main className="learn home-page">
      <header className="learn-head">
        <h1>Învață pentru bac, câte puțin în fiecare zi</h1>
        <p className="home-sub">
          Lecții de cinci minute, explicate simplu, cu întrebări ca la examen. Alege materia și continuă de unde ai
          rămas.
        </p>
      </header>

      <section className="glass widget learn-stats home-stats" aria-label="Progresul tău">
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
            {Math.min(today, DAILY_GOAL_XP)}/{DAILY_GOAL_XP}
          </span>
          <span className="learn-stat-label">XP azi</span>
        </div>
      </section>

      {!isPending && !session && hasProgress && (
        <section className="glass save-nudge">
          <p>Progresul tău e salvat doar în acest browser. Fă-ți cont ca să nu-l pierzi și să-l ai pe orice dispozitiv.</p>
          <Link className="btn btn-primary" href="/cont">
            Salvează progresul
          </Link>
        </section>
      )}

      <div className="subjects">
        {SUBJECTS.map((subj) => {
          const units = unitsFor(subj.id, s?.program ?? null);
          const ids = units.map((u) => u.id);
          const lessons = units.flatMap((u) => u.lessons);
          const done = lessons.filter((l) => s && l.id in s.done).length;
          const current = units.findIndex((u, i) => unitOpen(s, ids, i) && !testPassed(s, u.id));
          const next = current >= 0 ? units[current].lessons.find((l) => !(s && l.id in s.done)) : null;
          const pct = lessons.length ? done / lessons.length : 0;
          return (
            <Link key={subj.id} href={`/${subj.id}`} className="glass subject-card">
              <span className="unit-eyebrow">
                {units.length} capitole · {lessons.length} lecții
              </span>
              <h2 className="subject-title">{subj.title}</h2>
              <p className="card-sub">{subj.blurb}</p>
              <div className="goal-bar" aria-hidden="true">
                <i style={{ transform: `scaleX(${pct})` }} />
              </div>
              <span className="subject-next">
                {done === 0
                  ? "Începe cu prima lecție →"
                  : next
                    ? `Urmează: ${next.title} →`
                    : current >= 0
                      ? "Urmează testul capitolului →"
                      : "Totul terminat. Recapitulează →"}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
