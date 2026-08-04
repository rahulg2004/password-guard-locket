import { motion } from "motion/react";
import { LEVEL_VAR } from "./strength-colors";
import type { StrengthResult } from "@/types/password";

export function ScoreRing({ result }: { result: StrengthResult }) {
  const color = LEVEL_VAR[result.level];
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const entropyPct = Math.min(100, (result.stats.entropy / 100) * 100);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative grid place-items-center">
        <svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label={`Security score ${result.score} out of 100`}>
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-muted)" strokeWidth="12" />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: circumference * (1 - result.score / 100) }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="font-mono text-4xl font-bold text-foreground">{result.score}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">/ 100</p>
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Entropy meter</span>
          <span className="font-mono">{result.stats.entropy} bits</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={false}
            animate={{ width: `${entropyPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
