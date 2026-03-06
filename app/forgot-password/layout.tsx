import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Forgot Password — RuleBase",
  description: "Reset your RuleBase password. We'll send you a link to create a new password.",
  alternates: { canonical: `${baseUrl}/forgot-password` },
  openGraph: {
    title: "Forgot Password — RuleBase",
    description: "Reset your RuleBase password.",
    url: `${baseUrl}/forgot-password`,
  },
};

export default function ForgotPasswordLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
