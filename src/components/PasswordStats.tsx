import { Clock } from "lucide-react";
import type { PasswordStats as Stats } from "@/types/password";

export function PasswordStats({ stats }: { stats: Stats }) {
  const items: Array<[string, string | number]> = [
    ["Length", stats.length],
    ["Unique chars", stats.unique],
    ["Uppercase", stats.uppercase],
    ["Lowercase", stats.lowercase],
    ["Numbers", stats.numbers],
    ["Symbols", stats.symbols],
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">Password statistics</h2>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-background/40 p-3">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-background/40 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Entropy</p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-foreground">
            {stats.entropy} bits
          </p>
        </div>
        <div className="rounded-2xl bg-background/40 p-3">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" /> Estimated crack time
          </p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-foreground">
            {stats.crackTime}
          </p>
        </div>
      </div>
    </div>
  );
}
