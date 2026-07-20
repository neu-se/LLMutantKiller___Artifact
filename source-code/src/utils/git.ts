// src/utils/git.ts

import { exec as execCb } from "child_process";
import { LockOptions } from "../types"
import util from "util";
import fs from "fs/promises";
import path from "path";

const exec = util.promisify(execCb);

async function clearStaleLock(
  repoPath: string,
  opts: LockOptions = {}
): Promise<void> {
  const { aggressive = false, maxAgeMs = 10 * 60 * 1000 } = opts;
  const lockPath = path.join(repoPath, ".git", "index.lock");

  try {
    const stat = await fs.stat(lockPath);

    // 1) Always remove zero-byte lock files (classic stale case)
    if (stat.size === 0) {
      await fs.unlink(lockPath);
      console.warn(`[git] Removed zero-byte stale lock: ${lockPath}`);
      return;
    }

    // 2) Optionally: remove non-zero locks that are "old enough"
    if (aggressive) {
      const age = Date.now() - stat.mtimeMs;
      if (age > maxAgeMs) {
        await fs.unlink(lockPath);
        console.warn(
          `[git] Removed old lock (size=${stat.size}B, age=${Math.round(age / 1000)}s): ${lockPath}`
        );
        return;
      }
    }

    // Otherwise, treat as active and let the caller know
    throw new Error(
      `[git] Active git lock exists at ${lockPath} (size=${stat.size}B). ` +
      `If you are sure it's stale, rerun with aggressive cleanup enabled.`
    );
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      // No lock file — nothing to do
      return;
    }
    // Re-throw other fs errors or our "active lock" error
    throw err;
  }
}

export async function run_stash_and_checkout(
  repoPath: string,
  branch: string,
  aggressive: boolean = true,
  maxAgeMs: number
): Promise<void> {
  try {

    // clean up stale lock if present (with chosen policy)
    await clearStaleLock(repoPath, { aggressive, maxAgeMs });

    // Stash changes (ignore if nothing to stash)
    await exec("git stash --include-untracked --quiet", { cwd: repoPath });

    // Checkout branch
    await exec(`git checkout "${branch}" --quiet`, { cwd: repoPath });
  } catch (err: any) {
    const stderr = err?.stderr?.toString().trim();
    const stdout = err?.stdout?.toString().trim();
    const details = stderr || stdout || err.message;

    throw new Error(
      `Failed to stash and checkout branch '${branch}' in ${repoPath}:\n${details}`
    );
  }
}