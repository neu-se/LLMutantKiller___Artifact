// src/types/mutations.ts

export interface MutationObj {
  file: string;
  originalCode: string;
  replacement: string;
  startLine?: number;
  startColumn?: number;
  endLine?: number;
  endColumn?: number;
  removedLines?: string[];
  addedLines?: string[];
  lineSummary?: string[];
  [key: string]: unknown;
}

export type ProjectMutations    = Record<string, MutationObj>;
export type MutationsMap        = Record<string, ProjectMutations>;
export type MutationsMapEntries = Array<[string, ProjectMutations]>;
// filter list format (project -> [mutantIds])
export type MutationFilterMap = Record<string, string[]>;