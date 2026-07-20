import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling in Node.js environment", () => {
  it("should use process.nextTick for scheduling in a real Node.js environment", async () => {
    // In the original code, process.toString() === "[object process]" is true in Node.js,
    // so isNodeJS = true and requestTick uses process.nextTick.
    // In the mutated code, process.toString() === "" is always false,
    // so isNodeJS = false and requestTick uses setImmediate instead.
    
    const nextTickCalls: number[] = [];
    const originalNextTick = process.nextTick;
    
    let nextTickCallCount = 0;
    process.nextTick = function(callback: (...args: any[]) => void, ...args: any[]) {
      nextTickCallCount++;
      return originalNextTick.call(process, callback, ...args);
    } as typeof process.nextTick;
    
    try {
      // Trigger Q's scheduling by creating and resolving a promise
      await new Promise<void>((resolve) => {
        Q.resolve(42).then(() => {
          resolve();
        });
      });
      
      // In original code: process.nextTick is used, so count > 0
      // In mutated code: setImmediate is used instead, so count === 0
      expect(nextTickCallCount).toBeGreaterThan(0);
    } finally {
      process.nextTick = originalNextTick;
    }
  });
});