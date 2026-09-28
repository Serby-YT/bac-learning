// Runs once when the server starts: bring the account tables up to date, so a
// fresh deploy (or a Better Auth upgrade) never needs a manual migration step.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { getMigrations } = await import("better-auth/db/migration");
  const { auth } = await import("./lib/auth");
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.log(
      `[bac] database migrated: ${[...toBeCreated, ...toBeAdded].map((t) => t.table).join(", ")}`
    );
  }
}
