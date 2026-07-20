// src/utils/packageManager.ts
import { exec as execCb } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";

const exec = util.promisify(execCb);

async function isModernLockfile(lockPath: string): Promise<boolean> {
  try {
    const raw = await fs.readFile(lockPath, "utf8");
    const j = JSON.parse(raw);
    const v = j?.lockfileVersion;
    const hasPackages = !!j?.packages;
    return typeof v === "number" && v >= 3 && hasPackages;
  } catch {
    return false;
  }
}

function looksLikeLifecycleOrTSFailure(err: any): boolean {
  const s = (err?.stderr || err?.stdout || "").toString();
  return (
    /ELIFECYCLE|npm ERR! code ELIFECYCLE/i.test(s) ||
    /\bnode-?gyp\b|gyp ERR!/i.test(s) ||
    /\bnode-pre-gyp\b/i.test(s) ||
    /\berror TS\d{3,}\b/i.test(s) ||
    /\btsc\b/i.test(s)
  );
}

export async function ensureRepoInstalled(repoPath: string): Promise<void> {
  const env = {
    ...process.env,
    CI: "true",
  };

  const lockPath = path.join(repoPath, "package-lock.json");
  const hasLock = await fs.stat(lockPath).then(() => true).catch(() => false);
  const modernLock = hasLock ? await isModernLockfile(lockPath) : false;

  const baseCmd = modernLock ? "npm ci" : "npm install";

  try {
    await exec(`${baseCmd} --silent`, {
      cwd: repoPath,
      env,
      maxBuffer: 20 * 1024 * 1024,
    });
    return;
  } catch (err: any) {
    if (!looksLikeLifecycleOrTSFailure(err)) {
      throw err;
    }

    await exec(`${baseCmd} --silent --ignore-scripts`, {
      cwd: repoPath,
      env,
      maxBuffer: 20 * 1024 * 1024,
    });
  }
}

export async function ensureSubjectTestDepsInstalled(
  repoPath: string,
  orchestratorRoot: string
): Promise<void> {
  const pkgPath = path.join(repoPath, "package.json");
  let raw: string;
  try {
    raw = await fs.readFile(pkgPath, "utf8");
  } catch {
    return;
  }

  let pkg: any;
  try {
    pkg = JSON.parse(raw);
  } catch {
    return;
  }

  const devDeps = pkg && typeof pkg === "object" ? pkg.devDependencies : undefined;
  if (!devDeps || typeof devDeps !== "object") return;

  const excluded = new Set(["jest", "ts-jest", "@types/jest"]);
  const toInstall: string[] = [];

  const fnAny = ensureSubjectTestDepsInstalled as any;
  const installed: Set<string> = fnAny._installed || new Set<string>();

  for (const [name, version] of Object.entries(devDeps as Record<string, string>)) {
    if (excluded.has(name)) continue;
    const spec = `${name}@${version}`;
    if (!installed.has(spec)) {
      installed.add(spec);
      toInstall.push(spec);
    }
  }

  fnAny._installed = installed;

  if (toInstall.length === 0) return;

  await exec(`npm install --silent --save-dev ${toInstall.join(" ")}`, {
    cwd: orchestratorRoot,
    env: { ...process.env, CI: "true" },
    maxBuffer: 20 * 1024 * 1024,
  });
}