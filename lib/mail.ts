import "server-only";
import nodemailer from "nodemailer";

// Magic-link emails over plain SMTP, so any provider works (Resend, Brevo, ...):
//   SMTP_URL=smtps://user:password@smtp.example.com:465
//   MAIL_FROM="Bac <cont@serban-photo.com>"
// Without SMTP_URL: in development the link is printed to the server log;
// in production we refuse, so a missing setting can't fail silently.

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const transport = process.env.SMTP_URL ? nodemailer.createTransport(process.env.SMTP_URL) : null;

export async function sendMagicLinkEmail(to: string, url: string) {
  if (!transport) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP_URL is not set: cannot send the sign-in email.");
    }
    console.log(`\n[bac] Link de conectare pentru ${to}:\n${url}\n`);
    return;
  }

  await transport.sendMail({
    from: process.env.MAIL_FROM ?? "Bac <no-reply@serban-photo.com>",
    to,
    subject: "Linkul tău de conectare",
    text: `Salut!\n\nApasă pe linkul de mai jos ca să intri în cont. E valabil 15 minute și merge o singură dată.\n\n${url}\n\nDacă nu tu ai cerut linkul, ignoră acest email.`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5;color:#15161a">
  <p>Salut!</p>
  <p>Apasă pe butonul de mai jos ca să intri în cont. Linkul e valabil 15 minute și merge o singură dată.</p>
  <p><a href="${escapeHtml(url)}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#6d4ae0;color:#fff;text-decoration:none;font-weight:600">Intră în cont</a></p>
  <p style="color:#6c6e73;font-size:14px">Dacă nu tu ai cerut linkul, ignoră acest email.</p>
</div>`,
  });
}
