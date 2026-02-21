import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "RuleBase <onboarding@resend.dev>";
const BASE_URL = process.env.AUTH_URL ?? "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const verifyUrl = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn("[DEV] RESEND_API_KEY not set. Verification link:", verifyUrl);
    return { ok: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verify your RuleBase account",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Verify your email</h1>
        <p style="color: #666; margin-bottom: 24px;">
          Thanks for signing up for RuleBase! Click the button below to verify your email address.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229)); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Verify Email
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          This link expires in 24 hours. If you didn't create an account, you can ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send verification email:", error);
    return { ok: false, error };
  }
  return { ok: true };
}
