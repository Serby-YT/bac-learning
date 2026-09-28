import type { Metadata } from "next";
import { Suspense } from "react";
import AccountPanel from "@/components/AccountPanel";
import { googleEnabled } from "@/lib/auth";

// Read the Google setting at request time, not at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Contul tău — Bac" };

export default function AccountPage() {
  return (
    <main className="lesson account-page">
      <Suspense fallback={<section className="glass account-card" aria-busy="true" />}>
        <AccountPanel googleEnabled={googleEnabled} />
      </Suspense>
    </main>
  );
}
