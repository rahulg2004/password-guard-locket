import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { PasswordGenerator } from "@/components/PasswordGenerator";
import { PasswordInput } from "@/components/PasswordInput";
import { PasswordStats } from "@/components/PasswordStats";
import { PasswordHistory, type HistoryEntry } from "@/components/PasswordHistory";
import { RequirementsList } from "@/components/RequirementsList";
import { ScoreRing } from "@/components/ScoreRing";
import { SecurityTips } from "@/components/SecurityTips";
import { StrengthMeter } from "@/components/StrengthMeter";
import { Suggestions } from "@/components/Suggestions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTheme } from "@/hooks/use-theme";
import { calculateStrength } from "@/utils/password";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Password Strength Checker — Analyse & Generate Secure Passwords" },
      {
        name: "description",
        content:
          "Check password strength in real time with entropy, crack-time estimates, pattern detection and a secure generator. Everything runs offline in your browser.",
      },
      { property: "og:title", content: "Password Strength Checker" },
      {
        property: "og:description",
        content:
          "Real-time password analysis, entropy scoring, crack-time estimates and a strong password generator — fully client-side.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HISTORY_KEY = "psc-history";

function mask(password: string) {
  if (password.length <= 4) return "•".repeat(password.length);
  return `${password.slice(0, 2)}${"•".repeat(Math.max(2, password.length - 4))}${password.slice(-2)}`;
}

function Index() {
  const { theme, toggle } = useTheme();
  const [password, setPassword] = useState("");
  const debounced = useDebouncedValue(password, 120);
  const result = useMemo(() => calculateStrength(debounced), [debounced]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as HistoryEntry[]);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    if (debounced.length < 6) return;
    const entry: HistoryEntry = {
      masked: mask(debounced),
      score: result.score,
      level: result.level,
      at: Date.now(),
    };
    const id = setTimeout(() => {
      setHistory((prev) => {
        const next = [entry, ...prev.filter((p) => p.masked !== entry.masked)].slice(0, 5);
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        return next;
      });
    }, 1200);
    return () => clearTimeout(id);
  }, [debounced, result.score, result.level]);

  const exportReport = useCallback(() => {
    const report = [
      "Password Strength Report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Score: ${result.score}/100 (${result.level})`,
      `Length: ${result.stats.length}`,
      `Unique characters: ${result.stats.unique}`,
      `Uppercase / lowercase / numbers / symbols: ${result.stats.uppercase} / ${result.stats.lowercase} / ${result.stats.numbers} / ${result.stats.symbols}`,
      `Entropy: ${result.stats.entropy} bits`,
      `Estimated crack time: ${result.stats.crackTime}`,
      "",
      "Suggestions:",
      ...result.suggestions.map((s) => `- ${s}`),
      "",
      "Note: the password itself is never included in this report.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([report], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "password-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-primary/20 blur-3xl floating-orb"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-strength-5/15 blur-3xl floating-orb"
        style={{ animationDelay: "-6s" }}
      />

      <main className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">
                Password Strength Checker
              </h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Real-time analysis · entropy · crack time
              </p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2" delay={0.05}>
            <div className="space-y-7">
              <PasswordInput value={password} onChange={setPassword} />
              <StrengthMeter result={result} />
            </div>
          </GlassCard>

          <GlassCard delay={0.1}>
            <h2 className="mb-4 text-base font-semibold text-foreground">Security score</h2>
            <ScoreRing result={result} />
          </GlassCard>

          <GlassCard className="lg:col-span-2" delay={0.15}>
            <h2 className="mb-4 text-base font-semibold text-foreground">Requirements</h2>
            <RequirementsList requirements={result.requirements} />
          </GlassCard>

          <GlassCard delay={0.2}>
            <Suggestions suggestions={result.suggestions} />
          </GlassCard>

          <GlassCard className="lg:col-span-2" delay={0.25}>
            <PasswordStats stats={result.stats} />
          </GlassCard>

          <GlassCard delay={0.3}>
            <PasswordGenerator onUse={setPassword} />
          </GlassCard>

          <GlassCard className="lg:col-span-2" delay={0.35}>
            <SecurityTips />
          </GlassCard>

          <GlassCard delay={0.4}>
            <PasswordHistory entries={history} result={result} onExport={exportReport} />
          </GlassCard>
        </div>

        <footer className="mt-10 space-y-1 text-center text-xs text-muted-foreground">
          <p>Built with React + TypeScript + Tailwind CSS</p>
          <p className="font-medium text-foreground">Passwords never leave your browser.</p>
        </footer>
      </main>
    </div>
  );
}
