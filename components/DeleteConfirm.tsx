"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { DELETE_CONFIRM_PATH } from "@/lib/authSettings";
import { clearLearn } from "@/lib/progress";

// Where the delete-confirmation email leads. Deleting takes a button press here
// (email scanners open links on their own), and a session on this device: the
// confirmation token only works for the account that asked for it.

export default function DeleteConfirm() {
  const { data, isPending } = useSession();
  const token = useSearchParams().get("token") ?? "";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!isPending) setLoaded(true);
  }, [isPending]);

  if (!loaded && isPending) return <section className="glass account-card" aria-busy="true" />;

  if (!token) {
    return (
      <section className="glass account-card">
        <p className="lesson-done-eyebrow">Șterge contul</p>
        <h1 className="account-title">Link incomplet</h1>
        <p className="account-text">Linkul de confirmare nu e întreg. Deschide-l direct din email.</p>
      </section>
    );
  }

  if (!data) {
    const back = `${DELETE_CONFIRM_PATH}?token=${encodeURIComponent(token)}`;
    return (
      <section className="glass account-card">
        <p className="lesson-done-eyebrow">Șterge contul</p>
        <h1 className="account-title">Intră întâi în cont</h1>
        <p className="account-text">
          Ca să confirmi ștergerea, trebuie să fii conectat pe acest dispozitiv, cu contul pe care vrei să-l ștergi.
        </p>
        <Link className="btn btn-primary" href={`/cont?next=${encodeURIComponent(back)}`}>
          Intră în cont
        </Link>
      </section>
    );
  }

  const confirm = async () => {
    setBusy(true);
    setError(null);
    const { error: deleteError } = await authClient.deleteUser({ token });
    if (deleteError) {
      setBusy(false);
      setError(
        "Linkul de confirmare nu mai e valabil (a expirat, a fost folosit sau e pentru alt cont). Cere unul nou din pagina contului."
      );
      return;
    }
    clearLearn();
    window.location.assign("/cont?sters=1");
  };

  return (
    <section className="glass account-card">
      <p className="lesson-done-eyebrow">Șterge contul</p>
      <h1 className="account-title">Ștergi contul?</h1>
      <p className="account-text">
        Contul <strong>{data.user.email}</strong> și tot progresul salvat în el se șterg definitiv. Nu se poate anula.
      </p>
      {error && (
        <p className="account-error" role="alert">
          {error}
        </p>
      )}
      <div className="done-actions">
        <button type="button" className="btn danger-btn" onClick={confirm} disabled={busy}>
          {busy ? "Se șterge…" : "Da, șterge definitiv"}
        </button>
        <Link className="text-btn" href="/cont">
          Nu, păstrează contul
        </Link>
      </div>
    </section>
  );
}
