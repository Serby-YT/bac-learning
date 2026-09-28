import { notFound } from "next/navigation";
import SubjectPath from "@/components/SubjectPath";
import { SUBJECTS, findSubject } from "@/lib/content";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.id }));
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const found = findSubject(subject);
  if (!found) notFound();
  return <SubjectPath subjectId={found.id} />;
}
