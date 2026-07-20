import { createRequire } from "module";

describe("Q nextTick with MessageChannel", () => {
  it("should resolve promises using MessageChannel when setImmediate is unavailable", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    
    // Remove setImmediate to force the MessageChannel branch
    delete (global as any).setImmediate;

    const require = createRequire(import.meta.url);
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const Q = require(modulePath);

    // Restore setImmediate before the test runs async operations
    (global as any).setImmediate = originalSetImmediate;

    try {
      const result = await new Promise<number>((resolve, reject) => {
        setTimeout(() => reject(new Error("timeout")), 2000);
        Q(42).then((v: number) => resolve(v), (e: any) => reject(e));
      });
      expect(result).toBe(42);
    } finally {
      (global as any).setImmediate = originalSetImmediate;
    }
  });
});