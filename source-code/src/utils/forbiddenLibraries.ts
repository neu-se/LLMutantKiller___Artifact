// src/utils/forbiddenLibraries.ts

import { builtinModules } from "module";

function normalizeModuleName(s: string): string {
  const x = (s || "").trim();
  if (x.startsWith("node:")) return x.slice("node:".length);
  return x;
}

function packageRoot(spec: string): string {
  const s = normalizeModuleName(spec);
  if (!s) return s;
  if (s.startsWith("@")) {
    const parts = s.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : s;
  }
  return s.split("/")[0];
}

function isRelativeOrAbsolute(spec: string): boolean {
  return (
    spec.startsWith("./") ||
    spec.startsWith("../") ||
    spec.startsWith("/") ||
    spec.match(/^[A-Za-z]:[\\/]/) !== null
  );
}

function buildBuiltinSet(): Set<string> {
  const s = new Set<string>();
  for (const m of builtinModules) {
    s.add(normalizeModuleName(m));
  }
  return s;
}

const BUILTIN = buildBuiltinSet();

function stripInlineComment(s: string): string {
  const x = s || "";
  const hash = x.indexOf("#");
  const slashes = x.indexOf("//");
  let cut = x.length;
  if (hash !== -1) cut = Math.min(cut, hash);
  if (slashes !== -1) cut = Math.min(cut, slashes);
  return x.slice(0, cut).trim();
}

function cleanItem(s: string): string {
  const x = stripInlineComment((s || "").trim());
  return x.replace(/[,\s]+$/g, "").trim();
}

export function parseAllowedExternalLibraries(raw: string): Set<string> {
  const out = new Set<string>();
  const s = (raw || "").trim();
  if (!s) return out;

  let items: string[] = [];

  const tryJson = () => {
    try {
      const j = JSON.parse(s);
      if (Array.isArray(j)) {
        items = j.map(String);
        return true;
      }
      if (j && typeof j === "object") {
        const vals: string[] = [];
        for (const v of Object.values(j as Record<string, unknown>)) {
          if (Array.isArray(v)) vals.push(...v.map(String));
          else if (typeof v === "string") vals.push(v);
        }
        if (vals.length > 0) {
          items = vals;
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  };

  if (!tryJson()) {
    const lines = s.split(/\r?\n/g);

    const bulletItems: string[] = [];
    for (const line of lines) {
      const m = line.match(/^\s*[-*]\s+(.+?)\s*$/);
      if (!m) continue;
      const cleaned = cleanItem(m[1]);
      if (cleaned) bulletItems.push(cleaned);
    }

    if (bulletItems.length > 0) {
      items = bulletItems;
    } else {
      items = s
        .split(/[\r\n,]+/g)
        .map((x) => cleanItem(x))
        .filter(Boolean);
    }
  }

  for (const it of items) {
    const root = packageRoot(it.trim());
    if (root) out.add(root);
  }

  return out;
}

export function extractImportedModuleSpecifiers(code: string): string[] {
  const text = code || "";
  const out: string[] = [];

  const importFrom = /\bimport\s+[\s\S]*?\s+from\s*(['"])([^'"]+)\1/g;
  const importBare = /\bimport\s*(['"])([^'"]+)\1\s*;?/g;
  const requireCall = /\brequire\s*\(\s*(['"])([^'"]+)\1\s*\)/g;

  const add = (spec: string) => {
    const x = (spec || "").trim();
    if (!x) return;
    if (isRelativeOrAbsolute(x)) return;
    out.push(x);
  };

  let m: RegExpExecArray | null;

  while ((m = importFrom.exec(text)) !== null) add(m[2]);
  while ((m = importBare.exec(text)) !== null) add(m[2]);
  while ((m = requireCall.exec(text)) !== null) add(m[2]);

  return out;
}

export function detectForbiddenExternalLibraries(
  testCode: string,
  allowed: Set<string>
): { forbidden: string[]; message: string | null } {
  const specs = extractImportedModuleSpecifiers(testCode);
  const roots = specs.map(packageRoot).filter(Boolean);

  const forbiddenSet = new Set<string>();
  for (const r of roots) {
    const name = normalizeModuleName(r);
    if (!name) continue;
    if (BUILTIN.has(name)) continue;
    if (allowed.has(name)) continue;
    forbiddenSet.add(name);
  }

  const forbidden = Array.from(forbiddenSet).sort();
  if (forbidden.length === 0) return { forbidden, message: null };

  return {
    forbidden,
    message: forbidden.join(", "),
  };
}