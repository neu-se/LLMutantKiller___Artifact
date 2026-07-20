const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly filter stack traces based on stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple rejections
    const promise1 = Q.reject(new Error("First rejection"));
    const promise2 = promise1.then(() => {
      throw new Error("Second rejection");
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
      expect(error.message).toBe("First rejection");

      // Check that the stack trace contains only the first error
      // The mutation would include all errors in the stack trace
      const hasFirstError = error.stack.includes("First rejection");
      const hasSecondError = error.stack.includes("Second rejection");

      // Original code should only have the first error in the stack
      // Mutated code would have both errors
      expect(hasFirstError).toBe(true);
      expect(hasSecondError).toBe(false);
    }
  });
});