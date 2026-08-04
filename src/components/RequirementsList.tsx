import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { Requirement } from "@/types/password";

export function RequirementsList({ requirements }: { requirements: Requirement[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {requirements.map((req) => (
        <li key={req.id} className="flex items-center gap-3 rounded-2xl bg-background/40 px-3 py-2.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={String(req.met)}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid size-6 shrink-0 place-items-center rounded-full"
              style={{
                backgroundColor: req.met
                  ? "color-mix(in oklab, var(--strength-5) 22%, transparent)"
                  : "var(--color-muted)",
                color: req.met ? "var(--strength-5)" : "var(--color-muted-foreground)",
              }}
            >
              {req.met ? <Check className="size-4" /> : <X className="size-4" />}
            </motion.span>
          </AnimatePresence>
          <span className="min-w-0 text-sm text-foreground">
            {req.label}
            {req.recommended && (
              <span className="ml-1 text-xs text-muted-foreground">(recommended)</span>
            )}
          </span>
          <span className="sr-only">{req.met ? "requirement met" : "requirement not met"}</span>
        </li>
      ))}
    </ul>
  );
}
