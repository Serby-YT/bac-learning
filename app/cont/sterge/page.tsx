import type { Metadata } from "next";
import { Suspense } from "react";
import DeleteConfirm from "@/components/DeleteConfirm";

export const metadata: Metadata = { title: "Șterge contul — Bac", robots: { index: false } };

export default function DeleteAccountPage() {
  return (
    <main className="lesson account-page">
      <Suspense fallback={<section className="glass account-card" aria-busy="true" />}>
        <DeleteConfirm />
      </Suspense>
    </main>
  );
}
