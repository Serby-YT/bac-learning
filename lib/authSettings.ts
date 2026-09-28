// Account settings shared by the server (lib/auth.ts, lib/mail.ts) and the
// account page, so the numbers students read always match the real ones.

/** How long an emailed sign-in link works. */
export const SIGN_IN_LINK_MINUTES = 15;

/** How long an emailed "delete my account" confirmation link works. */
export const DELETE_LINK_MINUTES = 60;

/** Where the delete-confirmation email sends the student (a page with a button, never an automatic delete). */
export const DELETE_CONFIRM_PATH = "/cont/sterge";
