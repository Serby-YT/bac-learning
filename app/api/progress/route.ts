import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { readProgress, writeProgress } from "@/lib/db";
import { EMPTY_STATE, mergeProgress, sanitize } from "@/lib/mergeProgress";

// A signed-in student's progress. GET returns it; PUT merges what the browser
// has into what the server has (nothing is overwritten) and returns the result.

const MAX_BODY = 64 * 1024;

async function userId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.id ?? null;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const id = await userId();
  if (!id) return json({ error: "Neautentificat." }, 401);
  return json({ progress: sanitize(readProgress(id) ?? EMPTY_STATE) });
}

export async function PUT(request: Request) {
  const id = await userId();
  if (!id) return json({ error: "Neautentificat." }, 401);

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "Prea mare." }, 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "JSON invalid." }, 400);
  }

  const stored = sanitize(readProgress(id) ?? EMPTY_STATE);
  const merged = mergeProgress(stored, sanitize((body as { progress?: unknown })?.progress));
  writeProgress(id, merged);
  return json({ progress: merged });
}
