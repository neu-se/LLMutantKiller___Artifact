import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q MessageChannel branch", () => {
  it("should resolve promises using MessageChannel when setImmediate is unavailable", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    
    // Remove setImmediate to force the MessageChannel branch when Q is loaded
    delete (global as any).setImmediate;

    // Clear module cache and re-require Q so it initializes with MessageChannel
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    // Restore setImmediate (doesn't affect already-captured requestTick closure in QReloaded)
    (global as any).setImmediate = originalSetImmediate;

    // With original code: requestTick was set to use setTimeout+postMessage, so nextTick works
    // With mutated code: requestTick is undefined, calling nextTick throws TypeError
    let caughtError: any = null;
    let resolvedValue: any = null;

    try {
      resolvedValue = await new Promise<number>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("timeout")), 3000);
        QReloaded(42).then(
          (v: number) => { clearTimeout(timer); resolve(v); },
          (e: any) => { clearTimeout(timer); reject(e); }
        );
      });
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).toBeNull();
    expect(resolvedValue).toBe(42);
  });
});