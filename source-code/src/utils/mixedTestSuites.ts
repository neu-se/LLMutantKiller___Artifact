// src/utils/mixedTestSuites.ts

/** Parse Jest output to collect leaf test titles that passed/failed. */
export function parsePassFailTitlesFromLog(
  log: string
): { passed: string[]; failed: string[] } {
  const passed: string[] = [];
  const failed: string[] = [];
  for (const raw of log.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith("✓ ")) {
      passed.push(
        line.replace(/^✓\s+/, "").replace(/\s+\(\d+\s*ms\)\s*$/, "").trim()
      );
    } else if (line.startsWith("✕ ")) {
      failed.push(
        line.replace(/^✕\s+/, "").replace(/\s+\(\d+\s*ms\)\s*$/, "").trim()
      );
    }
  }
  // dedupe while preserving order
  const uniq = (xs: string[]) => Array.from(new Set(xs));
  return { passed: uniq(passed), failed: uniq(failed) };
}

export const isMixedSuite = (passed: string[], failed: string[]) =>
  passed.length > 0 && failed.length > 0;

/** Add/keep `.skip` on leaf tests whose title is in titlesToSkip. Preserve `.only`. Remove `.skip` if not intended. */
export function skipTitlesInCode(src: string, titlesToSkip: Set<string>): string {
  const re = /(it|test)\s*(?:\.(only|skip))?\s*\(\s*(['"`])([\s\S]*?)\3\s*,/g;
  return src.replace(re, (_m, fn, mod, q, title) => {
    const t = String(title).trim();
    if (titlesToSkip.has(t)) return `${fn}.skip(${q}${title}${q},`;
    if (mod === "skip") return `${fn}(${q}${title}${q},`; // remove skip if not intended
    return `${fn}${mod ? `.${mod}` : ""}(${q}${title}${q},`;
  });
}