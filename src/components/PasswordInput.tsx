import { Check, Copy, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Password copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Clipboard unavailable in this browser");
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor="password" className="block text-sm font-semibold text-foreground">
        Test a password
      </label>
      <div className="relative">
        <input
          id="password"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="Type or paste a password…"
          aria-describedby="password-privacy"
          className="h-14 w-full rounded-2xl border border-border bg-background/60 pl-4 pr-32 font-mono text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring"
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy password"
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {copied ? <Check className="size-5 text-strength-5" /> : <Copy className="size-5" />}
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear password"
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
      <p id="password-privacy" className="text-xs text-muted-foreground">
        Analysis runs entirely in your browser — nothing is transmitted or stored.
      </p>
    </div>
  );
}
