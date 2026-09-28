import "server-only";
import nodemailer from "nodemailer";
import { DELETE_LINK_MINUTES, SIGN_IN_LINK_MINUTES } from "./authSettings";

// Account emails over plain SMTP, so any provider works. With Resend:
//   SMTP_URL=smtps://resend:<API key>@smtp.resend.com:465
//   MAIL_FROM="Bac <cont@serban-photo.com>"
// Without SMTP_URL: in development the link is printed to the server log;
// in production sending throws, so a missing setting can't fail silently.

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const transport = process.env.SMTP_URL ? nodemailer.createTransport(process.env.SMTP_URL) : null;

interface AccountEmail {
  to: string;
  subject: string;
  /** Sentences before the button. */
  intro: string;
  button: string;
  url: string;
  /** Small print under the button. */
  footer: string;
}

async function sendAccountEmail({ to, subject, intro, button, url, footer }: AccountEmail) {
  if (!transport) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP_URL is not set: cannot send account emails.");
    }
    console.log(`\n[bac] ${subject} — ${to}:\n${url}\n`);
    return;
  }

  await transport.sendMail({
    from: process.env.MAIL_FROM ?? "Bac <no-reply@serban-photo.com>",
    to,
    subject,
    text: `Salut!\n\n${intro}\n\n${url}\n\n${footer}`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5;color:#15161a">
  <p>Salut!</p>
  <p>${escapeHtml(intro)}</p>
  <p><a href="${escapeHtml(url)}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#6d4ae0;color:#fff;text-decoration:none;font-weight:600">${escapeHtml(button)}</a></p>
  <p style="color:#6c6e73;font-size:14px">${escapeHtml(footer)}</p>
</div>`,
  });
}

export function sendMagicLinkEmail(to: string, url: string) {
  return sendAccountEmail({
    to,
    subject: "Linkul tău de conectare",
    intro: `Apasă pe butonul de mai jos ca să intri în cont. Linkul e valabil ${SIGN_IN_LINK_MINUTES} minute și merge o singură dată.`,
    button: "Intră în cont",
    url,
    footer: "Dacă nu tu ai cerut linkul, ignoră acest email.",
  });
}

export function sendDeleteConfirmEmail(to: string, url: string) {
  return sendAccountEmail({
    to,
    subject: "Confirmă ștergerea contului",
    intro: `Ai cerut ștergerea contului și a întregului progres salvat în el. Deschide linkul pe dispozitivul pe care ești conectat și confirmă. Linkul e valabil ${DELETE_LINK_MINUTES} de minute.`,
    button: "Mergi la confirmare",
    url,
    footer: "Dacă nu tu ai cerut asta, ignoră emailul: contul rămâne neatins.",
  });
}
