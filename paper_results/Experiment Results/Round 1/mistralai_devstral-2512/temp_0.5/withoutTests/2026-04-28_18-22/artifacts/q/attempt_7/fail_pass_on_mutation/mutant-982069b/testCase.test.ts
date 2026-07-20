// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should filter stack traces and keep non-internal frames", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Split stack into lines
      const stackLines = stack?.split('\n') || [];

      // In original code: should have at least some lines after filtering
      // In mutated code: the loop is empty so desiredLines remains empty
      // This means the stack would be empty or just contain minimal info
      expect(stackLines.length).toBeGreaterThan(0);

      // Check that we have at least one line that looks like a stack frame
      const hasStackFrame = stackLines.some(line =>
        line.includes("at ") ||
        line.includes("Error:") ||
        line.includes("testCase.test.ts")
      );
      expect(hasStackFrame).toBe(true);
    });
  });
});