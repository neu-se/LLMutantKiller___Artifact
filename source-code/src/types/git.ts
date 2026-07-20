// src/types/git.ts


export type LockOptions = {
  /** If true, will also remove non-zero locks older than maxAgeMs. Default: false (safe). */
  aggressive?: boolean;
  /** Consider a non-zero lock stale if older than this many ms. Default: 10 minutes. */
  maxAgeMs?: number;
};