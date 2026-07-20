// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should filter stack traces and keep external frames", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error with stack"));

    return promise.catch((error: Error) => {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Split stack into lines and filter out empty lines
      const stackLines = stack?.split('\n').filter(line => line.trim().length > 0) || [];

      // In original code: should have at least the error line and some external frames
      // In mutated code: the loop is empty so no lines are added to desiredLines
      // This means the stack would be empty or just contain the error message
      expect(stackLines.length).toBeGreaterThan(1);

      // Check that we have at least one frame that's not the error message itself
      const hasFrames = stackLines.some(line =>
        !line.includes("Error: Test error with stack") &&
        !line.includes("at ") &&
        line.trim().length > 0
      );
      expect(hasFrames).toBe(true);
    });
  });
});