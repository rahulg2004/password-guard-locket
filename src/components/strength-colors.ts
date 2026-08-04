import type { StrengthLevel } from "@/types/password";

export const LEVEL_VAR: Record<StrengthLevel, string> = {
  "Very Weak": "var(--strength-1)",
  Weak: "var(--strength-2)",
  Fair: "var(--strength-3)",
  Good: "var(--strength-4)",
  Strong: "var(--strength-5)",
  Excellent: "var(--strength-6)",
};
