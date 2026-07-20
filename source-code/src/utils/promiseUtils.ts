// src/utils/promiseUtils.ts

/**
 * Run an async factory with a timeout.
 * Rejects with Error("Timed out after <ms>ms" [+ label]) if not settled in time.
 */
export async function runWithTimeout<T>(
  factory: () => Promise<T>,
  ms: number,
  label?: string
): Promise<T> {
  let timer: NodeJS.Timeout | null = null;

  const timeoutP = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(
          new Error(
            `Timed out after ${Math.round(ms / 1000)}s${label ? ` (${label})` : ""}`
          )
        ),
      ms
    );
    if (typeof (timer as any).unref === "function") (timer as any).unref();
  });

  try {
    return await Promise.race([
      factory(),
      timeoutP,
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}