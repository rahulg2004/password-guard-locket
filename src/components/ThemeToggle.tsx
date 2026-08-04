import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="glass grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-foreground transition-transform hover:scale-105 active:scale-95"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid place-items-center"
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </motion.span>
    </button>
  );
}
