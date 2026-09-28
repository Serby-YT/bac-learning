import { notFound } from "next/navigation";
import { ChapterTest } from "@/components/LessonPlayer";
import { UNITS, findUnit } from "@/lib/content";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unitId: u.id }));
}

export default async function ChapterTestPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  if (!findUnit(unitId)) notFound();
  return <ChapterTest key={unitId} unitId={unitId} />;
}
