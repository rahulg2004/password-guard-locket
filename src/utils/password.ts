import {
  COMMON_PASSWORDS,
  DICTIONARY_WORDS,
  KEYBOARD_PATTERNS,
} from "@/data/password-data";
import type {
  GeneratorOptions,
  PasswordStats,
  Requirement,
  StrengthLevel,
  StrengthResult,
} from "@/types/password";

const UPPER = /[A-Z]/;
const LOWER = /[a-z]/;
const DIGIT = /[0-9]/;
const SYMBOL = /[^A-Za-z0-9]/;

export function estimateEntropy(password: string): number {
  if (!password) return 0;
  let pool = 0;
  if (LOWER.test(password)) pool += 26;
  if (UPPER.test(password)) pool += 26;
  if (DIGIT.test(password)) pool += 10;
  if (SYMBOL.test(password)) pool += 33;
  const uniqueRatio = new Set(password).size / password.length;
  return Math.log2(Math.max(pool, 1)) * password.length * (0.6 + 0.4 * uniqueRatio);
}

export function hasRepeatedCharacters(password: string): boolean {
  return /(.)\1{2,}/.test(password) || /(..+)\1/.test(password.toLowerCase());
}

export function hasSequentialCharacters(password: string): boolean {
  const lower = password.toLowerCase();
  for (let i = 0; i < lower.length - 2; i++) {
    const a = lower.charCodeAt(i);
    const b = lower.charCodeAt(i + 1);
    const c = lower.charCodeAt(i + 2);
    if ((b - a === 1 && c - b === 1) || (a - b === 1 && b - c === 1)) return true;
  }
  return false;
}

export function hasKeyboardPattern(password: string): boolean {
  const lower = password.toLowerCase();
  return KEYBOARD_PATTERNS.some((row) => {
    for (let i = 0; i <= row.length - 3; i++) {
      const chunk = row.slice(i, i + 3);
      const reversed = chunk.split("").reverse().join("");
      if (lower.includes(chunk) || lower.includes(reversed)) return true;
    }
    return false;
  });
}

export function isCommonPassword(password: string): boolean {
  const lower = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) return true;
  return [...COMMON_PASSWORDS].some(
    (common) => common.length >= 5 && lower.includes(common),
  );
}

export function containsDictionaryWord(password: string): boolean {
  const lower = password.toLowerCase();
  return DICTIONARY_WORDS.some((word) => lower.includes(word));
}

export function estimateCrackTime(entropy: number): string {
  if (entropy <= 0) return "Instantly";
  const guesses = Math.pow(2, entropy) / 2;
  const seconds = guesses / 1e10; // 10 billion guesses/sec offline attack
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.ceil(seconds)} seconds`;
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.ceil(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.ceil(seconds / 2592000)} months`;
  const years = seconds / 31536000;
  if (years < 100) return `${Math.ceil(years)} years`;
  if (years < 1e6) return `${Math.round(years / 100)} centuries`;
  if (years < 1e9) return `${(years / 1e6).toPrecision(3)} million years`;
  return "Beyond a lifetime of the universe";
}

export function getPasswordStats(password: string): PasswordStats {
  const entropy = estimateEntropy(password);
  return {
    length: password.length,
    uppercase: (password.match(/[A-Z]/g) ?? []).length,
    lowercase: (password.match(/[a-z]/g) ?? []).length,
    numbers: (password.match(/[0-9]/g) ?? []).length,
    symbols: (password.match(/[^A-Za-z0-9]/g) ?? []).length,
    unique: new Set(password).size,
    entropy: Math.round(entropy * 10) / 10,
    crackTime: estimateCrackTime(entropy),
  };
}

export function validatePassword(password: string): Requirement[] {
  return [
    { id: "len8", label: "At least 8 characters", met: password.length >= 8 },
    {
      id: "len12",
      label: "At least 12 characters",
      met: password.length >= 12,
      recommended: true,
    },
    { id: "upper", label: "Contains an uppercase letter", met: UPPER.test(password) },
    { id: "lower", label: "Contains a lowercase letter", met: LOWER.test(password) },
    { id: "digit", label: "Contains a number", met: DIGIT.test(password) },
    { id: "symbol", label: "Contains a special character", met: SYMBOL.test(password) },
    {
      id: "repeat",
      label: "No repeated patterns",
      met: password.length > 0 && !hasRepeatedCharacters(password),
    },
    {
      id: "common",
      label: "Not a common password",
      met: password.length > 0 && !isCommonPassword(password),
    },
    {
      id: "sequence",
      label: "No sequential characters",
      met: password.length > 0 && !hasSequentialCharacters(password),
    },
  ];
}

function levelFromScore(score: number): StrengthLevel {
  if (score < 20) return "Very Weak";
  if (score < 40) return "Weak";
  if (score < 60) return "Fair";
  if (score < 75) return "Good";
  if (score < 90) return "Strong";
  return "Excellent";
}

export function calculateStrength(password: string): StrengthResult {
  const stats = getPasswordStats(password);
  const requirements = validatePassword(password);
  const suggestions: string[] = [];

  if (!password) {
    return {
      score: 0,
      level: "Very Weak",
      breakdown: { length: 0, complexity: 0, uniqueness: 0, entropy: 0, patterns: 0 },
      requirements: requirements.map((r) => ({ ...r, met: false })),
      suggestions: ["Start typing to analyse your password."],
      stats,
    };
  }

  // Length — 30 points
  const lengthScore = Math.min(30, (password.length / 16) * 30);

  // Complexity — 25 points
  const classes = [UPPER, LOWER, DIGIT, SYMBOL].filter((re) => re.test(password)).length;
  const complexityScore = (classes / 4) * 25;

  // Uniqueness — 20 points
  const uniqueRatio = stats.unique / password.length;
  let uniquenessScore = uniqueRatio * 20;
  if (containsDictionaryWord(password)) uniquenessScore *= 0.5;
  if (isCommonPassword(password)) uniquenessScore *= 0.2;

  // Entropy — 15 points
  const entropyScore = Math.min(15, (stats.entropy / 80) * 15);

  // Pattern detection — 10 points
  let patternScore = 10;
  if (hasRepeatedCharacters(password)) patternScore -= 4;
  if (hasSequentialCharacters(password)) patternScore -= 3;
  if (hasKeyboardPattern(password)) patternScore -= 3;
  patternScore = Math.max(0, patternScore);

  const breakdown = {
    length: Math.round(lengthScore),
    complexity: Math.round(complexityScore),
    uniqueness: Math.round(uniquenessScore),
    entropy: Math.round(entropyScore),
    patterns: Math.round(patternScore),
  };

  let score =
    breakdown.length +
    breakdown.complexity +
    breakdown.uniqueness +
    breakdown.entropy +
    breakdown.patterns;

  if (isCommonPassword(password)) score = Math.min(score, 20);
  if (password.length < 8) score = Math.min(score, 35);
  score = Math.max(0, Math.min(100, Math.round(score)));

  if (password.length < 12) suggestions.push("Increase password length to 12+ characters.");
  if (!UPPER.test(password)) suggestions.push("Add uppercase letters.");
  if (!LOWER.test(password)) suggestions.push("Add lowercase letters.");
  if (!DIGIT.test(password)) suggestions.push("Add numbers.");
  if (!SYMBOL.test(password)) suggestions.push("Use more unique symbols.");
  if (hasSequentialCharacters(password))
    suggestions.push("Avoid predictable sequences like abc or 123.");
  if (hasRepeatedCharacters(password)) suggestions.push("Avoid repeated characters and patterns.");
  if (hasKeyboardPattern(password)) suggestions.push("Avoid keyboard walks like qwerty or asdf.");
  if (isCommonPassword(password)) suggestions.push("This resembles a leaked, common password.");
  else if (containsDictionaryWord(password)) suggestions.push("Avoid common dictionary words.");
  if (!suggestions.length)
    suggestions.push("Excellent work — store this in a password manager and enable MFA.");

  return { score, level: levelFromScore(score), breakdown, requirements, suggestions, stats };
}

const SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};
const AMBIGUOUS = "Il1O0o|`'\"{}[]()/\\";
const EASY_READ = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

function randomInt(max: number): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function generatePassword(options: GeneratorOptions): string {
  let pool = "";
  const required: string[] = [];

  const add = (set: string) => {
    let s = set;
    if (options.excludeAmbiguous)
      s = s
        .split("")
        .filter((c) => !AMBIGUOUS.includes(c))
        .join("");
    if (options.easyToRead)
      s = s
        .split("")
        .filter((c) => EASY_READ.includes(c) || SETS.symbols.includes(c))
        .join("");
    if (s.length) {
      pool += s;
      required.push(s[randomInt(s.length)]);
    }
  };

  if (options.uppercase) add(SETS.uppercase);
  if (options.lowercase) add(SETS.lowercase);
  if (options.numbers) add(SETS.numbers);
  if (options.symbols) add(SETS.symbols);
  if (!pool) {
    pool = SETS.lowercase;
    required.push("a");
  }

  const chars = [...required];
  while (chars.length < options.length) chars.push(pool[randomInt(pool.length)]);

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, options.length).join("");
}
