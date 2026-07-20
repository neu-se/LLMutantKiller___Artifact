// src/types/prompt.ts

/** Minimal fields required by buildOrigFileWithPlaceholder */
export type PlaceholderMutation = {
  file: string;          // relative path inside subject repo
  originalCode: string;  // the snippet to be replaced
};