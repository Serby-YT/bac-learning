import "server-only";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db, deleteProgress } from "./db";
import { sendMagicLinkEmail } from "./mail";

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
      // An account's progress goes with it.
      afterDelete: async (user) => deleteProgress(user.id),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 60, // stay signed in for 60 days
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/magic-link": { window: 60, max: 3 },
    },
  },
  plugins: [
    magicLink({
      expiresIn: 60 * 15,
      storeToken: "hashed",
      sendMagicLink: async ({ email, url }) => sendMagicLinkEmail(email, url),
    }),
    nextCookies(), // must stay last
  ],
});

export type Session = typeof auth.$Infer.Session;
