const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should correctly filter stack traces based on stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple rejections
    const promise1 = Q.reject(new Error("Error 1"));
    const promise2 = promise1.then(() => {
      throw new Error("Error 2");
    });
    const promise3 = promise2.then(() => {
      throw new Error("Error 3");
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
      expect(error.message).toBe("Error 1");

      // Check that the stack trace contains only the first error
      // The mutation would include all errors in the stack trace
      const stackLines = error.stack.split('\n');
      const errorMessagesInStack = stackLines.filter(line =>
        line.includes("Error 1") || line.includes("Error 2") || line.includes("Error 3")
      );

      // Original code should only have Error 1 in the stack
      // Mutated code would have all three errors
      expect(errorMessagesInStack.length).toBe(1);
      expect(errorMessagesInStack[0]).toContain("Error 1");
    }
  });
});