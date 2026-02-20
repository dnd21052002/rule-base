import Link from "next/link";
import { Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Trending", href: "#trending" },
  { label: "Rules", href: "#rules" },
  { label: "Pricing", href: "#pricing" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Terminal className="size-3.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">RuleBase</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
            </a>
          </Button>
          <div className="mx-1 h-4 w-px bg-white/[0.08]" />
          <Button variant="ghost" size="sm" className="text-[13px] text-muted-foreground" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-[13px] text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500" asChild>
            <a href="#pricing">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
