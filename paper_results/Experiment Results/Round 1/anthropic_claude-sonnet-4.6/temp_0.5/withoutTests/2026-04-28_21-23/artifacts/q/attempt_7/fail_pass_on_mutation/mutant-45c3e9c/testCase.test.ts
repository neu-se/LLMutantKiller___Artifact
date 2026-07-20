import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick mutation detection", () => {
  it("should call requestTick when flushing is false by checking tasks execute without any prior trigger", () => {
    // Intercept process.nextTick to verify it gets called
    const originalNextTick = process.nextTick;
    let nextTickCallCount = 0;
    
    process.nextTick = function(...args: Parameters<typeof process.nextTick>) {
      nextTickCallCount++;
      return originalNextTick.apply(process, args);
    };
    
    try {
      Q.nextTick(function() {});
      // Original: requestTick() called because !flushing is true
      // Mutated: if (false) means requestTick() never called
      expect(nextTickCallCount).toBeGreaterThan(0);
    } finally {
      process.nextTick = originalNextTick;
    }
  });
});