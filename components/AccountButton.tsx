"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

/** Top-bar entry: "Intră în cont" when signed out, the user's initial when signed in. */
export default function AccountButton() {
  const { data, isPending } = useSession();
  if (isPending) return <span className="account-btn is-pending" aria-hidden="true" />;
  if (!data) {
    return (
      <Link href="/cont" className="account-link">
        Intră în cont
      </Link>
    );
  }
  const who = data.user.name || data.user.email;
  return (
    <Link href="/cont" className="account-btn" aria-label={`Contul tău (${who})`} title={who}>
      {who.trim().charAt(0).toUpperCase()}
    </Link>
  );
}
