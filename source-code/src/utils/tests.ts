// src/utils/tests.ts
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import ts from "typescript";
import { JestResult, RunJestOptions } from "../types";
import { ensureRepoInstalled } from "./packageManager";

export function detectSyntaxErrorInContent(
  code: string,
  fileName: string = "testCase.test.ts"
): string | null {
  const result = ts.transpileModule(code, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      allowJs: true,
    },
  });

  const diagnostics = result.diagnostics ?? [];
  const diag = diagnostics.find((d) => d.category === ts.DiagnosticCategory.Error);
  if (!diag) return null;

  if (diag.file && typeof diag.start === "number") {
    const pos = ts.getLineAndCharacterOfPosition(diag.file, diag.start);
    const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
    return `${diag.file.fileName}:${pos.line + 1}:${pos.character + 1} - ${message}`;
  }

  const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
  return `${message}`;
}

export async function runJest(
  repoPath: string,
  testFileAbsPath: string,
  opts: RunJestOptions = {}
): Promise<JestResult> {
  const { quiet = true, noColor = true } = opts;

  await ensureRepoInstalled(repoPath);

  const orchestratorRoot = process.cwd();
  const jestBin = path.join(orchestratorRoot, "node_modules", ".bin", "jest");

  const jestConfigCjs = path.join(orchestratorRoot, "jest.config.cjs");
  const jestConfigJson = path.join(orchestratorRoot, "jest.config.json");
  const jestConfig = fs.existsSync(jestConfigCjs) ? jestConfigCjs : jestConfigJson;

  const tsconfigCandidate = path.join(repoPath, "tsconfig.json");

  const repoNodeModules = path.join(repoPath, "node_modules");
  const orchestratorNodeModules = path.join(orchestratorRoot, "node_modules");
  const existingNodePath = process.env.NODE_PATH || "";
  const sep = process.platform === "win32" ? ";" : ":";

  const nodePathParts: string[] = [];
  nodePathParts.push(repoNodeModules);
  nodePathParts.push(orchestratorNodeModules);
  if (existingNodePath) nodePathParts.push(existingNodePath);

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    CI: "true",
    NODE_PATH: nodePathParts.join(sep),
  };

  if (fs.existsSync(tsconfigCandidate)) {
    env.TS_JEST_TSCONFIG = tsconfigCandidate;
  }

  const args = [
    "--config",
    `"${jestConfig}"`,
    "--runInBand",
    noColor ? "--no-color" : "--color",
    "--runTestsByPath",
    `"${testFileAbsPath}"`,
  ];

  const cmd = `"${jestBin}" ${args.join(" ")}`;

  return new Promise<JestResult>((resolve) => {
    let combined = "";
    const child = spawn(cmd, {
      cwd: orchestratorRoot,
      env,
      shell: true,
    });

    child.stdout.on("data", (d) => {
      const s = d.toString();
      combined += s;
      if (!quiet) process.stdout.write(s);
    });
    child.stderr.on("data", (d) => {
      const s = d.toString();
      combined += s;
      if (!quiet) process.stderr.write(s);
    });
    child.on("error", (err) => {
      const msg = `\n[spawn error] ${err?.message || String(err)}\n`;
      combined += msg;
      if (!quiet) process.stderr.write(msg);
    });
    child.on("close", (code) => {
      resolve({
        syntaxError: false,
        passed: code === 0 && !/FAIL\b/.test(combined),
        log: combined,
      });
    });
  });
}

/** Choose the most "test-like" fenced code block from an LLM reply. */
export function extractTestCode(text: string): string {
  const fence = /```(\w+)?\s*([\s\S]*?)```/g;
  let best: { content: string; score: number } | null = null;

  const scoreBlock = (lang: string | undefined, code: string) => {
    const lc = code.toLowerCase();
    let score = 0;

    if (lang) {
      const l = lang.toLowerCase();
      if (["ts", "typescript", "tsx"].includes(l)) score += 3;
      if (["js", "javascript"].includes(l)) score += 2;
    }

    if (/\bdescribe\s*\(/i.test(code)) score += 4;
    if (/\b(it|test)\s*\(/i.test(code)) score += 3;
    if (/\bexpect\s*\(/i.test(code)) score += 2;
    if (/\bjest\./i.test(code)) score += 2;

    if (/import\s+.*from\s+['"].+['"]/.test(code)) score += 2;
    if (/export\s+/.test(code)) score += 1;

    score += Math.min(5, Math.floor(code.length / 500));

    return score;
  };

  let m: RegExpExecArray | null;
  while ((m = fence.exec(text)) !== null) {
    const lang = m[1];
    const content = m[2].trim();
    const score = scoreBlock(lang, content);
    if (!best || score > best.score) best = { content, score };
  }

  return (best?.content ?? text).trim();
}