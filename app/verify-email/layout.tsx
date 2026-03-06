import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Verify Email — RuleBase",
  description: "Verify your email address to complete your RuleBase account.",
  alternates: { canonical: `${baseUrl}/verify-email` },
  openGraph: {
    title: "Verify Email — RuleBase",
    description: "Verify your email address for RuleBase.",
    url: `${baseUrl}/verify-email`,
  },
};

export default function VerifyEmailLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
