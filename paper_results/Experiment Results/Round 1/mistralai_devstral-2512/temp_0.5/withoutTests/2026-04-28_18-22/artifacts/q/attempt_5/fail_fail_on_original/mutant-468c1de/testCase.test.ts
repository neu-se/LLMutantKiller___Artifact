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

    // Add a third promise to create more stack frames
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
      // regardless of stack counter, which would make the stack trace
      // contain all three errors. In the original code, only the most
      // recent error should be in the stack trace.
      expect(error.message).toBe("Third error");

      // Check that the stack trace doesn't contain the first error message
      // This would indicate the mutation is present
      expect(error.stack).not.toContain("First error");
    }
  });
});