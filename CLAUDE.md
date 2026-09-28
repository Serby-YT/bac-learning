# bac-learning

Duolingo-style site for the Romanian bacalaureat: short lessons + chapter tests.
Math (M1 mate-info / M2 științe ale naturii) and Română first. Forked in spirit
from Trading Claude (`~/Documents/Trading Claude`): same Next.js stack, same
liquid-glass look (violet accent instead of blue), same lesson player — minus the
Wick mascot, voice and chart art.

## Decisions (Serban, 2026-09-28)

- Math: M1 + M2 with a filter. Each `Unit` can set `programs: ["M1"]` to hide it
  from M2 students. Subiectul I topics are common to both.
- Users: **public, with accounts** — but built in stages:
  1. Lessons, progress in the browser (localStorage `bac-progress-v1`) ← DONE
  2. Accounts (Google + email magic link) + database; import localStorage progress ← DONE
  3. Română essays graded by Claude against the barem — **only Serban's account**
     for now (API costs money). Never render student text through `Rich` (it
     injects KaTeX HTML); essays need plain-text rendering.
  4. Online at **bac.serban-photo.com** (Tailscale-only staging first, like the
     other apps; never checkout a branch in a live docroot)
- Brand name is a placeholder ("Bac · beta"). Ask before naming.

## Accounts (stage 2)

- Better Auth (`lib/auth.ts`) on `node:sqlite` (`lib/db.ts`) — no native modules, so the
  Mac-built standalone bundle runs on the Linux server. Tables are migrated at startup
  (`instrumentation.ts`). DB file = `DATABASE_PATH` (gitignored `data/`; locally an absolute
  path in `.env.local`, because the preview server starts from another folder).
- Progress stays in localStorage; `components/ProgressSync.tsx` pushes it after every change
  and on sign-in. `PUT /api/progress` sanitizes and **merges** (`lib/mergeProgress.ts`,
  tested by `npm test`) — never overwrites. Sign-out clears the browser copy.
- No `SMTP_URL` → in dev the magic link is printed in the server log (preview_logs, search
  "magic-link/verify"); in production sending fails loudly. Google button only appears when
  `GOOGLE_CLIENT_ID`/`SECRET` are set. See `.env.example`.
- Spec + tickets: `.scratch/accounts/` (gitignored).

## Commands

- Dev: preview server `bac-learning` (port 3006) from `~/Documents/Claude Code/.claude/launch.json`
- `npm test` — merge/sanitize unit tests
- `npm run check` — type-check + validate every lesson (answer indexes, KaTeX,
  test-pool sizes). Run after every content change.
- `npx next build` — production build (standalone output, like Trading Claude)

## Content rules

- Lessons live in `lib/content/*.ts`, registered in `lib/content/index.ts` (`UNITS`,
  order matters: chapters unlock one after another per subject).
- Text supports `**bold**`, `$inline math$`, and a paragraph wrapped in `$$…$$`
  for a centred formula. Escape backslashes in TS strings: `"$\\frac{1}{2}$"`.
- Tests: 10 questions drawn from the unit's `test` pool (8 to pass), an even share
  per lesson — so each pool needs ≥ 10 questions and ≥ floor(10 / lessons) per lesson.
- Work out every math answer by hand and put the working in `explain`.
- Romanian: quote verses only from public-domain authors (Eminescu, Creangă,
  Caragiale, Slavici…). Arghezi, Blaga, Barbu, Stănescu, Bacovia (until 2028) are
  still under copyright — describe, don't quote.
- Student-facing copy is Romanian, addressed with "tu"; Serban's own first-person
  copy is masculine.
