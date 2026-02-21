"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Loader2, Terminal, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/actions/auth";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid reset link");
      return;
    }
    setMessage("");
    setIsLoading(true);
    const result = await resetPassword(token, email, password);
    setIsLoading(false);
    if (result?.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setMessage(result?.error ?? "Something went wrong");
    }
  }

  if (!token || !email) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="hero-grid pointer-events-none absolute inset-0 h-full" />
        <div className="hero-glow animate-glow-pulse" />
        <Link
          href="/forgot-password"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <div className="glass-card relative w-full max-w-sm rounded-2xl p-8 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-500/20">
            <XCircle className="size-8 text-red-500" />
          </div>
          <h1 className="text-lg font-semibold">Invalid link</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This password reset link is invalid or incomplete. Please request a new one.
          </p>
          <Button variant="outline" className="mt-6 w-full border-border" asChild>
            <Link href="/forgot-password">Request new link</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="hero-grid pointer-events-none absolute inset-0 h-full" />
      <div className="hero-glow animate-glow-pulse" />

      <Link
        href="/sign-in"
        className="absolute left-6 top-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>

      <div className="glass-card relative w-full max-w-sm rounded-2xl p-8">
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <div className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl shadow-lg shadow-violet-500/25"
            style={{ background: "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(79, 70, 229))" }}
          >
            <Terminal className="size-5 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight">
              Set new password
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter and confirm your new password below.
            </p>
          </div>
        </div>

        {status === "success" && (
          <>
            <div
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(to bottom right, rgb(34, 197, 94), rgb(22, 163, 74))" }}
            >
              <CheckCircle className="size-8 text-white" />
            </div>
            <h2 className="text-center text-lg font-semibold">Password updated!</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              You can now sign in with your new password.
            </p>
            <Button
              className="mt-6 w-full text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
              style={{ background: "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))" }}
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-500/20">
              <XCircle className="size-8 text-red-500" />
            </div>
            <h2 className="text-center text-lg font-semibold">Reset failed</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {message}
            </p>
            <p className="mt-4 text-center text-[13px] text-muted-foreground">
              The link may have expired. Request a new one from the forgot password page.
            </p>
            <Button variant="outline" className="mt-6 w-full border-border" asChild>
              <Link href="/forgot-password">Request new link</Link>
            </Button>
          </>
        )}

        {status === "form" && (
          <>
            {message && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-[13px] text-red-600 dark:text-red-400">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium text-muted-foreground"
                >
                  New password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-10 rounded-lg border-border bg-subtle text-[13px] placeholder:text-muted-foreground/40 focus-visible:border-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500/15"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm"
                  className="text-[13px] font-medium text-muted-foreground"
                >
                  Confirm password
                </label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={8}
                  className="h-10 rounded-lg border-border bg-subtle text-[13px] placeholder:text-muted-foreground/40 focus-visible:border-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500/15"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be 8+ characters with at least one uppercase, one lowercase, and one number.
              </p>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full text-[13px] font-medium text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
                style={{ background: "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
