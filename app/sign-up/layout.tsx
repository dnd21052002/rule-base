import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Sign Up — RuleBase",
  description: "Create a RuleBase account. Share and discover AI editor prompts for Cursor, Windsurf, and more.",
  alternates: { canonical: `${baseUrl}/sign-up` },
  openGraph: {
    title: "Sign Up — RuleBase",
    description: "Create a RuleBase account. Share and discover AI editor prompts.",
    url: `${baseUrl}/sign-up`,
  },
};

export default function SignUpLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
