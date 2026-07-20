const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly filter stack traces based on stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple rejections
    const promise1 = Q.reject(new Error("Original error"));
    const promise2 = promise1.then(() => {
      throw new Error("Modified error");
    });

    try {
      await promise2;
      fail("Should have thrown an error");
    } catch (error: any) {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // The mutation would cause all stack traces to be included
      // regardless of stack counter. In the original code, only the most
      // recent error should be in the stack trace.
      expect(error.message).toBe("Original error");

      // Check that the stack trace contains only the original error
      // The mutation would include both errors in the stack trace
      const stackLines = error.stack.split('\n');
      const hasOriginalError = stackLines.some(line => line.includes("Original error"));
      const hasModifiedError = stackLines.some(line => line.includes("Modified error"));

      // Original code should only have the original error in the stack
      // Mutated code would have both errors
      expect(hasOriginalError).toBe(true);
      expect(hasModifiedError).toBe(false);

      // Additional check: count how many times "error" appears in stack trace
      const errorCount = stackLines.filter(line =>
        line.includes("Original error") || line.includes("Modified error")
      ).length;

      // Original code should have exactly 1 error in stack
      // Mutated code would have 2 errors
      expect(errorCount).toBe(1);
    }
  });
});