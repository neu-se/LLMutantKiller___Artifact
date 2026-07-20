// src/utils/pathUtils.ts
import path from "path";
import os from "os";
import fs from "fs";
import { createDirectoryIfMissing } from "./";

/** Expand "~" to the user's home directory when present. */
function expandTilde(p: string): string {
  if (!p) return p;
  if (p === "~") return os.homedir();
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

/** Detect the repo root (folder containing package.json). */
function findRepoRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  while (true) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

export const PROJECT_ROOT_PATH = findRepoRoot(__dirname);

/** Root-relative resolver (handles absolute paths & ~ expansion). */
export function resolveFromRoot(...segments: string[]) {
  if (segments.length === 0) return PROJECT_ROOT_PATH;
  const [head, ...tail] = segments;
  const first = expandTilde(head ?? "");
  if (path.isAbsolute(first)) return path.resolve(first, ...tail);
  return path.resolve(PROJECT_ROOT_PATH, first, ...tail);
}

/** Convenience alias */
export const fromRoot = resolveFromRoot;

/** Normalize a project path (absolute or root-relative) */
export function normalizeProjectPath(p: string): string {
  return resolveFromRoot(p);
}

/** Split project path into baseDir + projectName */
export function splitProjectPath(p: string): { baseDir: string; projectName: string } {
  const abs = normalizeProjectPath(p);
  return { baseDir: path.dirname(abs), projectName: path.basename(abs) };
}

/* =====================================
   PATH HELPERS (pure, no filesystem IO)
   ===================================== */

export function joinAbsolute(base: string, ...segments: string[]) {
  return path.join(base, ...segments);
}

/** Build the artifacts *base* once and reuse it elsewhere. */
export function buildArtifactsBase(
  outDir: string,
  model: string,
  runId: string,
  projectName: string
): string {
  return path.join(outDir, model, runId, "artifacts", projectName);
}

/**
 * Build (and ensure) an artifact directory from a *base*.
 * base = <outDir>/<model>/<runId>/artifacts/<projectName>
 * dir  = <base>/attempt_<i>/<category>/<shortMutantId>
 */
export async function buildArtifactDirPath(
  base: string,
  attempt: number,
  category: string,
  mutationId: string
) {
  const dirPath = path.join(base, `attempt_${attempt}`, category, mutationId);
  await createDirectoryIfMissing(dirPath);
  return dirPath;
}

/** e.g. <root>/templates/<templateName> */
export function templatePath(templateName: string) {
  return path.join(PROJECT_ROOT_PATH, "templates", templateName);
}

/** Path relative to the project root */
export function relativeToRoot(p: string) {
  const abs = path.isAbsolute(p) ? p : path.resolve(PROJECT_ROOT_PATH, p);
  return path.relative(PROJECT_ROOT_PATH, abs);
}

const ARTIFACT_FILENAMES = {
  test: "testCase.test.ts",
  chat: "chatHistory.json",
  main_log: "main_log.txt",
  mutated_log: "mutated_log.txt",
} as const;

export type ArtifactKind = keyof typeof ARTIFACT_FILENAMES;

export type ArtifactPaths = {
  promptPath: string;
  testCasePath: string;
  chatHistoryPath: string;
  mainLogPath: string;
  mutatedLogPath: string;
};

/** Build artifact file paths inside a directory */
export function buildArtifactPaths(dir: string, attempt: number): ArtifactPaths {
  return {
    promptPath: path.join(dir, `prompt_${attempt}.txt`),
    testCasePath: path.join(dir, ARTIFACT_FILENAMES.test),
    chatHistoryPath: path.join(dir, ARTIFACT_FILENAMES.chat),
    mainLogPath: path.join(dir, ARTIFACT_FILENAMES.main_log),
    mutatedLogPath: path.join(dir, ARTIFACT_FILENAMES.mutated_log),
  };
}