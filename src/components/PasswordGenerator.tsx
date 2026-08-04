import { Copy, RefreshCw, Wand2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { generatePassword } from "@/utils/password";
import type { GeneratorOptions } from "@/types/password";

const TOGGLES: Array<[keyof GeneratorOptions, string]> = [
  ["uppercase", "Uppercase"],
  ["lowercase", "Lowercase"],
  ["numbers", "Numbers"],
  ["symbols", "Symbols"],
  ["excludeAmbiguous", "Exclude ambiguous"],
  ["easyToRead", "Easy to read"],
];

export function PasswordGenerator({ onUse }: { onUse: (password: string) => void }) {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: true,
    easyToRead: false,
  });
  const [generated, setGenerated] = useState("");

  const regenerate = useCallback(() => {
    setGenerated(generatePassword(options));
  }, [options]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      toast.success("Generated password copied");
    } catch {
      toast.error("Clipboard unavailable in this browser");
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Wand2 className="size-4 text-primary" aria-hidden="true" />
        Password generator
      </h2>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl bg-background/50 p-3">
        <p className="min-w-0 break-all font-mono text-sm text-foreground" aria-live="polite">
          {generated}
        </p>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={regenerate}
            aria-label="Generate a new password"
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy generated password"
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Copy className="size-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="length" className="font-medium text-foreground">
            Length
          </label>
          <span className="font-mono text-muted-foreground">{options.length}</span>
        </div>
        <Slider
          id="length"
          min={8}
          max={64}
          step={1}
          value={[options.length]}
          onValueChange={([v]) => setOptions((o) => ({ ...o, length: v ?? o.length }))}
          aria-label="Password length"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {TOGGLES.map(([key, label]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-2xl bg-background/40 px-3 py-2.5"
          >
            <label htmlFor={`opt-${key}`} className="text-sm text-foreground">
              {label}
            </label>
            <Switch
              id={`opt-${key}`}
              checked={Boolean(options[key])}
              onCheckedChange={(checked) => setOptions((o) => ({ ...o, [key]: checked }))}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onUse(generated)}
        className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Generate strong password &amp; analyse it
      </button>
    </div>
  );
}
