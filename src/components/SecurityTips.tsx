import { SECURITY_TIPS } from "@/data/password-data";
import { GraduationCap } from "lucide-react";

export function SecurityTips() {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <GraduationCap className="size-4 text-primary" aria-hidden="true" />
        Security essentials
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {SECURITY_TIPS.map((tip) => (
          <li key={tip.title} className="rounded-2xl bg-background/40 p-3">
            <p className="text-sm font-semibold text-foreground">{tip.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tip.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
