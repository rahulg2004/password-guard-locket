export type StrengthLevel =
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Good"
  | "Strong"
  | "Excellent";

export interface Requirement {
  id: string;
  label: string;
  met: boolean;
  recommended?: boolean;
}

export interface PasswordStats {
  length: number;
  uppercase: number;
  lowercase: number;
  numbers: number;
  symbols: number;
  unique: number;
  entropy: number;
  crackTime: string;
}

export interface ScoreBreakdown {
  length: number;
  complexity: number;
  uniqueness: number;
  entropy: number;
  patterns: number;
}

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
  breakdown: ScoreBreakdown;
  requirements: Requirement[];
  suggestions: string[];
  stats: PasswordStats;
}

export interface GeneratorOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  easyToRead: boolean;
}
