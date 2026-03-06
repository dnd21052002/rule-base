import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Reset Password — RuleBase",
  description: "Create a new password for your RuleBase account.",
  alternates: { canonical: `${baseUrl}/reset-password` },
  openGraph: {
    title: "Reset Password — RuleBase",
    description: "Create a new password for your RuleBase account.",
    url: `${baseUrl}/reset-password`,
  },
};

export default function ResetPasswordLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
