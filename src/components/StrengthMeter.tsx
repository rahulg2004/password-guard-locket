import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { LEVEL_VAR } from "./strength-colors";
import type { StrengthResult } from "@/types/password";

export function StrengthMeter({ result }: { result: StrengthResult }) {
  const color = LEVEL_VAR[result.level];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Strength
          </p>
          <p className="truncate text-2xl font-bold" style={{ color }}>
            {result.level}
          </p>
        </div>
        <div
          className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: `color-mix(in oklab, ${color} 18%, transparent)`, color }}
        >
          <ShieldCheck className="size-4" aria-hidden="true" />
          {result.score}%
        </div>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={result.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Password strength ${result.score} out of 100, ${result.level}`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ width: `${result.score}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {(
          [
            ["Length", result.breakdown.length, 30],
            ["Complexity", result.breakdown.complexity, 25],
            ["Uniqueness", result.breakdown.uniqueness, 20],
            ["Entropy", result.breakdown.entropy, 15],
            ["Patterns", result.breakdown.patterns, 10],
          ] as const
        ).map(([label, value, max]) => (
          <div key={label} className="rounded-2xl bg-background/40 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-foreground">
              {value}
              <span className="text-muted-foreground">/{max}</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={false}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
