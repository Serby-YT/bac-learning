import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { readProgress, writeProgress } from "@/lib/db";
import { EMPTY_STATE, mergeProgress, sanitize } from "@/lib/learnState";

// A signed-in student's progress. GET returns it; PUT merges what the browser
// has into what the server has (nothing is overwritten) and returns the result.

const MAX_BODY_BYTES = 64 * 1024;

async function userId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.id ?? null;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** The body as text, or null if it's over `max` bytes — stops reading as soon as it is. */
async function readBody(request: Request, max: number): Promise<string | null> {
  if (Number(request.headers.get("content-length")) > max) return null;
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function GET() {
  const id = await userId();
  if (!id) return json({ error: "Neautentificat." }, 401);
  return json({ progress: sanitize(readProgress(id) ?? EMPTY_STATE) });
}

export async function PUT(request: Request) {
  const id = await userId();
  if (!id) return json({ error: "Neautentificat." }, 401);

  const text = await readBody(request, MAX_BODY_BYTES);
  if (text == null) return json({ error: "Prea mare." }, 413);
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
