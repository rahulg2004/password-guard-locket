import { Download, History } from "lucide-react";
import type { StrengthResult } from "@/types/password";

export interface HistoryEntry {
  masked: string;
  score: number;
  level: string;
  at: number;
}

export function PasswordHistory({
  entries,
  result,
  onExport,
}: {
  entries: HistoryEntry[];
  result: StrengthResult;
  onExport: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="flex min-w-0 items-center gap-2 text-base font-semibold text-foreground">
          <History className="size-4 text-primary" aria-hidden="true" />
          Recent checks (masked)
        </h2>
        <button
          type="button"
          onClick={onExport}
          disabled={result.stats.length === 0}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Export report
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Checked passwords appear here, masked and stored only on this device.
        </p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.at}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-background/40 px-3 py-2.5"
            >
              <span className="truncate font-mono text-sm text-foreground">{entry.masked}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {entry.level} · {entry.score}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
