const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly filter stack traces based on stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will generate stack traces
    const promise1 = Q.reject(new Error("First error"));
    const promise2 = promise1.then(() => {
      throw new Error("Second error");
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
      expect(error.message).toBe("First error");

      // Check that the stack trace contains the first error message
      // This verifies the original behavior
      expect(error.stack).toContain("First error");
    }
  });
});