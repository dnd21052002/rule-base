export default function DashboardLoading() {
  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />
      <div className="relative mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="glass-card mb-8 flex animate-pulse items-center gap-4 rounded-2xl p-6">
          <div className="size-14 shrink-0 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-40 rounded bg-muted" />
            <div className="h-4 w-56 rounded bg-muted" />
          </div>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card h-24 animate-pulse rounded-xl bg-muted/30"
            />
          ))}
        </div>
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="glass-card h-28 animate-pulse rounded-xl bg-muted/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
