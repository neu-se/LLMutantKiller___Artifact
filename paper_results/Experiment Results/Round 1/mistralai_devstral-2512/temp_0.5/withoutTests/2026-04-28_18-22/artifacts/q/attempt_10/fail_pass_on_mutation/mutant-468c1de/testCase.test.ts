const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly filter stack traces based on stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple rejections
    const promise1 = Q.reject(new Error("First error"));
    const promise2 = promise1.then(() => {
      throw new Error("Second error");
    });
    const promise3 = promise2.then(() => {
      throw new Error("Third error");
    });

    try {
      await promise3;
      fail("Should have thrown an error");
    } catch (error: any) {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // The mutation would cause all stack traces to be included
      // regardless of stack counter. In the original code, only the most
      // recent error should be in the stack trace.
      expect(error.message).toBe("First error");

      // Check that the stack trace contains only the first error
      // The mutation would include all errors in the stack trace
      const stackLines = error.stack.split('\n');
      const errorMessages = stackLines.filter(line =>
        line.includes("First error") ||
        line.includes("Second error") ||
        line.includes("Third error")
      );

      // Original code should only have the first error in the stack
      // Mutated code would have all three errors
      expect(errorMessages.length).toBe(1);
      expect(errorMessages[0]).toContain("First error");

      // Verify that the stack doesn't contain the other error messages
      expect(error.stack).not.toContain("Second error");
      expect(error.stack).not.toContain("Third error");
    }
  });
});