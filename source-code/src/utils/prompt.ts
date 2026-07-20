// src/utils/prompt.ts

import Handlebars from "handlebars";
import path from "path";
import { PlaceholderMutation } from "../types";
import { templatePath, readFileOrJson } from "."

export async function compileTemplate(templateName: string, context: Record<string, unknown>): Promise<string> {
  const tplPath = templatePath(templateName);
  const tplSrc = await readFileOrJson(tplPath);
  const tpl = Handlebars.compile(tplSrc, { noEscape: true });
  return tpl(context);
}

/** Normalize newlines to '\n' for consistent matching. */
function normalizeNewlines(s: string): string {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

/** Escape a string for use inside a RegExp. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Try to replace the first occurrence of `needle` in `haystack` with `replacement`.
 * If exact substring search fails, try a whitespace-flexible regex match.
 */
function replaceOnceFlexible(
  haystack: string,
  needle: string,
  replacement: string
): { ok: boolean; result: string } {
  // 1) Fast path: exact substring
  const idx = haystack.indexOf(needle);
  if (idx !== -1) {
    const result = haystack.slice(0, idx) + replacement + haystack.slice(idx + needle.length);
    return { ok: true, result };
  }

  // 2) Whitespace-flexible fallback:
  // Convert any run of whitespace in needle into \s+ to be tolerant of formatting differences.
  const needleFlex = escapeRegExp(needle).replace(/\s+/g, "\\s+");
  const re = new RegExp(needleFlex);
  const m = re.exec(haystack);
  if (!m) return { ok: false, result: haystack };

  const start = m.index;
  const end = start + m[0].length;
  const result = haystack.slice(0, start) + replacement + haystack.slice(end);
  return { ok: true, result };
}

/**
 * Range-based placeholder injection:
 * Replace full lines [startLine..endLine) (1-based, endLine is EXCLUSIVE) with `<PLACEHOLDER>`.
 */
function injectPlaceholderByLineRange(
  fileSrcRaw: string,
  startLine: number,
  endLine: number
): string {
  const src = normalizeNewlines(fileSrcRaw);
  const lines = src.split("\n");

  const s = Math.max(1, startLine);
  const e = Math.max(s, endLine);

  const startIdx = s - 1; // inclusive
  const endIdx = e - 1; // exclusive endLine => slice endIdx+1? no: we slice at e-1? we want slice(e-1)? Actually endLine is exclusive, so use e-1 as slice index.
  if (startIdx < 0 || startIdx >= lines.length) return fileSrcRaw;

  const safeEndIdx = Math.min(endIdx, lines.length);

  const indentMatch = (lines[startIdx] ?? "").match(/^\s*/);
  const indent = indentMatch ? indentMatch[0] : "";

  const before = lines.slice(0, startIdx);
  const after = lines.slice(safeEndIdx);

  const injected = `${indent}<PLACEHOLDER>`;
  return [...before, injected, ...after].join("\n");
}

/**
 * Builds the full source file content with the original mutated region replaced
 * by a literal `<PLACEHOLDER>` token.
 *
 * Primary strategy: line-range replacement using startLine/endLine.
 * Fallback: try matching originalCode snippet if range replacement is not usable.
 */
export async function buildOrigFileWithPlaceholder(
  repoPath: string,
  mutationObj: PlaceholderMutation
): Promise<string> {
  const absPath = path.join(repoPath, mutationObj.file);
  const fileSrcRaw = (await readFileOrJson(absPath)) as string;

  const startLine = Number((mutationObj as any).startLine ?? 0);
  const endLine = Number((mutationObj as any).endLine ?? 0);

  if (startLine > 0 && endLine > 0) {
    return injectPlaceholderByLineRange(fileSrcRaw, startLine, endLine);
  }

  const fileSrc = normalizeNewlines(fileSrcRaw);
  const original = normalizeNewlines(String(mutationObj.originalCode || ""));

  if (!original.trim()) return fileSrcRaw;

  const { ok, result } = replaceOnceFlexible(fileSrc, original, "<PLACEHOLDER>");
  // Return the raw newline style from the file when possible
  return ok ? result : fileSrcRaw;
}