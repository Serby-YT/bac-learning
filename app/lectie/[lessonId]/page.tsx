import { notFound } from "next/navigation";
import LessonPlayer from "@/components/LessonPlayer";
import { ALL_LESSONS, findLesson } from "@/lib/content";

export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  if (!findLesson(lessonId)) notFound();
  return <LessonPlayer key={lessonId} lessonId={lessonId} />;
}
