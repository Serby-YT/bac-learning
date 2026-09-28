import "server-only";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db, deleteProgress } from "./db";
import { sendDeleteConfirmEmail, sendMagicLinkEmail } from "./mail";
import { DELETE_CONFIRM_PATH, DELETE_LINK_MINUTES, SIGN_IN_LINK_MINUTES } from "./authSettings";

// Accounts: Google (when configured) and emailed magic links. No passwords.
// Env: BETTER_AUTH_SECRET, BETTER_AUTH_URL, optional GOOGLE_CLIENT_ID/SECRET.

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
    : null;

export const googleEnabled = google != null;

export const auth = betterAuth({
  database: db,
  socialProviders: google ? { google } : {},
  user: {
    deleteUser: {
      enabled: true,
      // Confirmed by email: proves the address is yours, and works however old
      // the session is. The link opens our page (a button), never deletes by
      // itself — email scanners open links too.
      deleteTokenExpiresIn: DELETE_LINK_MINUTES * 60,
      sendDeleteAccountVerification: async ({ user, token }) => {
        const origin = process.env.BETTER_AUTH_URL ?? "http://localhost:3006";
        await sendDeleteConfirmEmail(user.email, `${origin}${DELETE_CONFIRM_PATH}?token=${encodeURIComponent(token)}`);
      },
      // An account's progress goes with it.
      afterDelete: async (user) => deleteProgress(user.id),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 60, // stay signed in for 60 days, like most learning apps
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    // Behind Cloudflare the visitor's address is in CF-Connecting-IP (set by
    // Cloudflare, can't be forged through the tunnel). X-Forwarded-For is the
    // fallback for direct Tailscale access; it's only trusted with one value.
    ipAddress: { ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"] },
  },
  rateLimit: {
    enabled: true,
    customRules: {
      "/sign-in/magic-link": { window: 60, max: 3 },
      "/delete-user": { window: 60, max: 3 },
    },
  },
  plugins: [
    magicLink({
      expiresIn: SIGN_IN_LINK_MINUTES * 60,
      storeToken: "hashed",
      sendMagicLink: async ({ email, url }) => sendMagicLinkEmail(email, url),
    }),
    nextCookies(), // must stay last
  ],
});
