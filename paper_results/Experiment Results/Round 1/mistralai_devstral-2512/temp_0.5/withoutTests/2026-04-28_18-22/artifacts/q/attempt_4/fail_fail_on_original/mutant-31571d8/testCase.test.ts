const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q long stack traces", () => {
  it("should properly build long stack traces with multiple promise rejections", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will be rejected
    const error = new Error("Original error");
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => { throw new Error("Second error"); });
    const promise3 = promise2.then(() => { throw new Error("Third error"); });

    try {
      await promise3;
      fail("Promise should have been rejected");
    } catch (e: any) {
      // The mutation breaks the stack trace building logic
      // In the original code, the stack should contain multiple promise traces
      // In the mutated code, the condition will always be false after first check
      expect(e.stack).toBeDefined();
      // The mutated version will have a different stack trace structure
      // because it won't properly concatenate all promise stacks
      const stackLines = e.stack.split('\n');
      const hasPreviousEvent = e.stack.includes("From previous event:");
      expect(hasPreviousEvent).toBe(true);
      // Count occurrences of "From previous event:"
      const previousEventCount = (e.stack.match(/From previous event:/g) || []).length;
      expect(previousEventCount).toBeGreaterThan(1);
    }
  });
});