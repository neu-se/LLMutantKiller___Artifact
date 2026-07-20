const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal Q frames from stack traces", () => {
    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: any) => {
      const stack = error.stack;
      // The mutation changes isInternalFrame to always return true
      // This means in the mutated version, ALL frames will be filtered
      // In the original version, only Q internal frames are filtered
      // We check for the presence of non-Q frames in the stack
      const hasNonQFrames = stack.split('\n').some(line =>
        line.includes('.test.ts') || line.includes('at Object.')
      );

      // Original code should have non-Q frames (they're not filtered)
      // Mutated code will filter everything (no non-Q frames remain)
      expect(hasNonQFrames).toBe(true);
    });
  });
});