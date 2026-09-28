"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { SIGN_IN_LINK_MINUTES } from "@/lib/authSettings";
import { clearLearn } from "@/lib/progress";
import { pushProgress } from "@/lib/sync";

// The /cont page: sign in (Google or emailed link), or, when signed in, see the
// account, sign out, ask to delete it (confirmed by email).

// Better Auth reports an expired and an already-used link the same way.
const LINK_ERRORS: Record<string, string> = {
  INVALID_TOKEN: `Linkul nu mai e valabil: fie a trecut de ${SIGN_IN_LINK_MINUTES} minute, fie a fost deja folosit. Cere unul nou mai jos.`,
  EXPIRED_TOKEN: `Linkul nu mai e valabil: fie a trecut de ${SIGN_IN_LINK_MINUTES} minute, fie a fost deja folosit. Cere unul nou mai jos.`,
  failed_to_create_user: "Nu am putut crea contul. Încearcă din nou.",
};

/** Only same-site paths are allowed as a place to come back to after signing in. */
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/cont";
}

export default function AccountPanel({ googleEnabled }: { googleEnabled: boolean }) {
  const { data, isPending } = useSession();
  const params = useSearchParams();
  // The client re-checks the session after sending a link. Show the placeholder
  // only on the very first check, or the "link sent" message would be wiped.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!isPending) setLoaded(true);
  }, [isPending]);

  if (!loaded && isPending) return <section className="glass account-card" aria-busy="true" />;
  return data ? (
    <SignedIn email={data.user.email} />
  ) : (
    <SignIn googleEnabled={googleEnabled} linkError={params.get("error")} next={safeNext(params.get("next"))} />
  );
}

function SignIn({ googleEnabled, linkError, next }: { googleEnabled: boolean; linkError: string | null; next: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(
    linkError ? (LINK_ERRORS[linkError] ?? "Ceva n-a mers. Încearcă din nou.") : null
  );
  const deleted = useSearchParams().get("sters") === "1";

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("sending");
    const { error: sendError } = await authClient.signIn.magicLink({ email: email.trim(), callbackURL: next });
    if (sendError) {
      setState("idle");
      setError(
        sendError.status === 429
          ? "Prea multe cereri. Așteaptă un minut și încearcă din nou."
          : (sendError.status ?? 500) >= 500
            ? "Nu am putut trimite emailul acum. Încearcă din nou în câteva minute."
            : "Adresa de email nu pare corectă. Verific-o și încearcă din nou."
      );
      return;
    }
    setState("sent");
  };

  if (state === "sent") {
    return (
      <section className="glass account-card" aria-live="polite">
        <p className="lesson-done-eyebrow">Verifică-ți emailul</p>
        <h1 className="account-title">Ți-am trimis linkul</h1>
        <p className="account-text">
          Am trimis un link de conectare la <strong>{email.trim()}</strong>. Apasă pe el și ești în cont. E valabil{" "}
          {SIGN_IN_LINK_MINUTES} minute. Dacă nu-l găsești, uită-te și în Spam.
        </p>
        <button type="button" className="text-btn" onClick={() => setState("idle")}>
          Altă adresă sau alt link
        </button>
      </section>
    );
  }

  return (
    <section className="glass account-card">
      <p className="lesson-done-eyebrow">Contul tău</p>
      <h1 className="account-title">Intră în cont</h1>
      <p className="account-text">
        Cu un cont, progresul tău e salvat și îl ai pe orice telefon sau laptop. Ce ai făcut deja în acest browser se
        păstrează. Nu ai nevoie de parolă.
      </p>

      {deleted && (
        <p className="account-note" role="status">
          Contul și progresul tău au fost șterse.
        </p>
      )}
      {error && (
        <p className="account-error" role="alert">
          {error}
        </p>
      )}

      {googleEnabled && (
        <>
          <button
            type="button"
            className="btn google-btn"
            onClick={() => authClient.signIn.social({ provider: "google", callbackURL: next })}
          >
            <GoogleMark /> Continuă cu Google
          </button>
          <p className="account-or">
            <span>sau</span>
          </p>
        </>
      )}

      <form className="account-form" onSubmit={sendLink}>
        <label htmlFor="email" className="account-label">
          Primește un link pe email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="adresa@exemplu.ro"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "sending"}
        />
        <button type="submit" className="btn btn-primary" disabled={state === "sending" || !email.trim()}>
          {state === "sending" ? "Se trimite…" : "Trimite linkul"}
        </button>
      </form>
    </section>
  );
}

function SignedIn({ email }: { email: string }) {
  const [busy, setBusy] = useState(false);
  // Sign-out: a warning when the latest progress couldn't be saved first.
  const [unsaved, setUnsaved] = useState(false);
  // Delete: idle → confirming (second click) → sent (email on its way).
  const [deleteState, setDeleteState] = useState<"idle" | "confirming" | "sent">("idle");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const signOut = async () => {
    setBusy(true);
    // Last push first: the browser copy is about to be cleared.
    if (!unsaved && !(await pushProgress())) {
      setUnsaved(true);
      setBusy(false);
      return;
    }
    await authClient.signOut();
    clearLearn(); // it's safe in the account; don't leave it on a shared computer
    setBusy(false);
  };

  const requestDelete = async () => {
    if (deleteState === "idle") {
      setDeleteState("confirming");
      return;
    }
    setBusy(true);
    setDeleteError(null);
    const { error: requestError } = await authClient.deleteUser({});
    setBusy(false);
    if (requestError) {
      setDeleteState("idle");
      setDeleteError(
        requestError.status === 429
          ? "Prea multe cereri. Așteaptă un minut și încearcă din nou."
          : "Nu am putut trimite emailul de confirmare. Încearcă din nou în câteva minute."
      );
      return;
    }
    setDeleteState("sent");
  };

  return (
    <section className="glass account-card">
      <p className="lesson-done-eyebrow">Contul tău</p>
      <h1 className="account-title">Ești în cont</h1>
      <p className="account-text">
        Contul tău: <strong>{email}</strong>. Progresul se salvează automat, după fiecare lecție.
      </p>
      {unsaved && (
        <p className="account-error" role="alert">
          Nu am putut salva ultimele schimbări (poate ești offline). Dacă ieși acum, se pierd. Apasă din nou ca să ieși
          oricum.
        </p>
      )}
      <div className="done-actions">
        <Link className="btn btn-primary" href="/">
          Înapoi la lecții
        </Link>
        <button type="button" className="text-btn" onClick={signOut} disabled={busy}>
          {unsaved ? "Ieși oricum" : "Ieși din cont"}
        </button>
      </div>

      <div className="account-danger">
        <h2 className="account-danger-title">Șterge contul</h2>
        {deleteState === "sent" ? (
          <p className="account-text" aria-live="polite">
            Ți-am trimis un email de confirmare la <strong>{email}</strong>. Deschide linkul din el pe acest dispozitiv și
            confirmă. Până atunci, contul rămâne neatins.
          </p>
        ) : (
          <>
            <p className="account-text">
              Se șterg contul și tot progresul salvat în el. Nu se poate anula. Îți trimitem întâi un email de
              confirmare.
            </p>
            {deleteError && (
              <p className="account-error" role="alert">
                {deleteError}
              </p>
            )}
            <button type="button" className="btn danger-btn" onClick={requestDelete} disabled={busy}>
              {deleteState === "confirming" ? "Sigur? Apasă din nou" : "Șterge contul"}
            </button>
            {deleteState === "confirming" && (
              <button type="button" className="text-btn" onClick={() => setDeleteState("idle")}>
                Renunță
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
