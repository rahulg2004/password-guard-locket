import { AnimatePresence, motion } from "motion/react";
import { Lightbulb } from "lucide-react";

export function Suggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <div className="space-y-3">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Lightbulb className="size-4 text-strength-3" aria-hidden="true" />
        Smart feedback
      </h2>
      <ul aria-live="polite" className="space-y-2">
        <AnimatePresence initial={false}>
          {suggestions.map((s) => (
            <motion.li
              key={s}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl bg-background/40 px-3 py-2.5 text-sm text-foreground"
            >
              {s}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
