// src/utils/fsUtils.ts
import fs from "fs/promises";
import path from "path";

/* ==========================
   FS HELPERS (touch the OS)
   ========================== */

export async function createDirectoryIfMissing(addr: string) {
  // no-op if exists; creates recursively otherwise
  await fs.mkdir(addr, { recursive: true });
}

export async function writeFile(addr: string, data: unknown) {
  await createDirectoryIfMissing(path.dirname(addr));
  if (addr.toLowerCase().endsWith(".json")) {
    await fs.writeFile(addr, JSON.stringify(data, null, 2), "utf8");
  } else {
    await fs.writeFile(addr, String(data), "utf8");
  }
}

/** Reads text; if path ends with .json (case-insensitive), returns parsed JSON */
export async function readFileOrJson(addr: string): Promise<string | unknown> {
  const content = await fs.readFile(addr, "utf8");
  if (addr.toLowerCase().endsWith(".json")) {
    return JSON.parse(content) as Record<string, unknown>;
  }
  return content;
}

/** Back-compat alias if you want to keep old import names around */
// export const readFile = readFileOrJson;

export async function directoryExists(addr: string): Promise<boolean> {
  try {
    const stats = await fs.stat(addr);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function deleteDirectoryIfExists(addr: string): Promise<void> {
  addr = path.dirname(addr);
  if (await directoryExists(addr)) {
    await fs.rm(addr, { recursive: true, force: true });
  }
}

export async function listSubdirectories(p: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(p, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

export async function pathExists(p: string): Promise<boolean> {
  try { await fs.stat(p); return true; } catch { return false; }
}

/**
 * Recursively copy all files and subdirectories from src to dest.
 * Used to mirror cached artifacts into the run's outDir.
 */
export async function copyDirectoryRecursive(src: string, dest: string): Promise<void> {
  await createDirectoryIfMissing(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectoryRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      const data = await fs.readFile(srcPath);
      await fs.writeFile(destPath, data);
    }
  }
}