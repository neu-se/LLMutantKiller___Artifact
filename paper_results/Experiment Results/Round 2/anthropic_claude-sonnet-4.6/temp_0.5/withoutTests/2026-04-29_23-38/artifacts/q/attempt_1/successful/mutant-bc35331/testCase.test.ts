import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution in Node.js environment", () => {
  it("should correctly identify Node.js environment and resolve promises using process.nextTick", async () => {
    // The mutation changes process.toString() === "[object process]" to process.toString() === ""
    // In real Node.js, process.toString() returns "[object process]"
    // The original code sets isNodeJS = true and uses process.nextTick for scheduling
    // The mutated code never sets isNodeJS = true, falling through to setImmediate
    
    // We can verify the behavior by checking that Q.nextTick actually uses process.nextTick
    // in a real Node.js environment (original) vs setImmediate (mutated)
    
    // Spy on process.nextTick to detect if it's being used
    const nextTickCalls: number[] = [];
    const originalNextTick = process.nextTick;
    
    let nextTickCallCount = 0;
    process.nextTick = function(callback: (...args: any[]) => void, ...args: any[]) {
      nextTickCallCount++;
      return originalNextTick.call(process, callback, ...args);
    } as typeof process.nextTick;
    
    try {
      // Trigger Q's internal tick mechanism
      const result = await new Promise<number>((resolve) => {
        Q.resolve(42).then((value: number) => {
          resolve(value);
        });
      });
      
      expect(result).toBe(42);
      // In original code: isNodeJS=true, so process.nextTick is used -> nextTickCallCount > 0
      // In mutated code: isNodeJS=false, so setImmediate is used -> nextTickCallCount === 0
      expect(nextTickCallCount).toBeGreaterThan(0);
    } finally {
      process.nextTick = originalNextTick;
    }
  });
});