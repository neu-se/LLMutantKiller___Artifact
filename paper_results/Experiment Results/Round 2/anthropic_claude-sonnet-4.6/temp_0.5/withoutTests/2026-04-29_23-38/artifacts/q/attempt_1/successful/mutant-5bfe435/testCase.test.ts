import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick mechanism in Node.js environment", () => {
  it("should use process.nextTick as the tick mechanism in a real Node.js environment", async () => {
    // In the original code, isNodeJS is set to true and process.nextTick is used
    // In the mutated code, isNodeJS remains false and setImmediate is used instead
    
    const originalNextTick = process.nextTick;
    let nextTickCallCount = 0;
    
    // Spy on process.nextTick
    process.nextTick = function(...args: Parameters<typeof process.nextTick>) {
      nextTickCallCount++;
      return originalNextTick.apply(process, args);
    };
    
    try {
      // Create a promise and wait for it to resolve
      // This should trigger the tick mechanism
      const result = await Q.Promise(function(resolve: (value: number) => void) {
        resolve(42);
      });
      
      // Wait a bit to ensure all ticks have been processed
      await new Promise<void>(resolve => originalNextTick(resolve));
      await new Promise<void>(resolve => originalNextTick(resolve));
      
      // In the original code, process.nextTick should have been called
      // In the mutated code, setImmediate would be used instead
      expect(nextTickCallCount).toBeGreaterThan(0);
      expect(result).toBe(42);
    } finally {
      process.nextTick = originalNextTick;
    }
  });
});