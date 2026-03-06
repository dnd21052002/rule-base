import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Support — RuleBase",
  description: "Support RuleBase development. GitHub Sponsors, Ko-fi, and ways to contribute.",
  alternates: { canonical: `${baseUrl}/support` },
  openGraph: {
    title: "Support — RuleBase",
    description: "Support RuleBase development. Sponsors and contributions.",
    url: `${baseUrl}/support`,
  },
};

export default function SupportLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
