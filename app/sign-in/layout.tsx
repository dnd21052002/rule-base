import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Sign In — RuleBase",
  description: "Sign in to RuleBase with GitHub, Google, or email. Access your saved rules and dashboard.",
  alternates: { canonical: `${baseUrl}/sign-in` },
  openGraph: {
    title: "Sign In — RuleBase",
    description: "Sign in to RuleBase with GitHub, Google, or email.",
    url: `${baseUrl}/sign-in`,
  },
};

export default function SignInLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
