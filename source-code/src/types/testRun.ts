// src/types/testRun.ts

/** Final classification for an attempt */
export type Category =
  | "fail_syntax_error"
  | "fail_forbidden_libraries"
  | "fail_fail_on_original"
  | "fail_pass_on_mutation"
  | "successful";

/** Message format shared by ChatClient/Session */
export type ChatMsg =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string }
  | { role: "system"; content: string };

/** Jest execution result */
export type JestResult = { syntaxError: boolean; passed: boolean; log: string };

/** Options for running Jest from the orchestrator */
export type RunJestOptions = {
  /** If true, do NOT echo Jest output to the terminal. Defaults to true. */
  quiet?: boolean;
  /** If true, pass --no-color to Jest so logs are plain text. Defaults to true. */
  noColor?: boolean;
};

export type AttemptResult = {
  attempt: number;
  category: Category;
  elapsedSeconds: number;
  tokensIn: number;
  tokensOut: number;
  cachedTokens?: number;
  cacheWriteTokens?: number;
  uncachedTokensIn?: number;
  openRouterCost?: number;
  /** Path relative to repo root: "generated_tests/<MODEL>/<ts>/<project>/attempt_X/<category>/<shortId>" */
  collectedRelPath: string;
};
