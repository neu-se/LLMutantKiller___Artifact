// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should filter stack traces and keep non-internal frames", () => {
    // Create a promise that will generate a stack trace with both internal and external frames
    const promise = Q.resolve()
      .then(() => {
        // This creates an external frame that should be kept
        return Q.reject(new Error("Test error"));
      });

    return promise.catch((error: Error) => {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Count non-empty lines in the stack trace
      const nonEmptyLines = stack?.split('\n').filter(line => line.trim().length > 0) || [];

      // In original code: external frames should remain after filtering
      // In mutated code: all frames are filtered out (empty loop), leaving only the error message
      // So we expect at least 2 lines (error message + at least one external frame)
      expect(nonEmptyLines.length).toBeGreaterThan(1);

      // Verify at least one external frame remains (not from q.js internal functions)
      const hasExternalFrame = nonEmptyLines.some(line =>
        line.includes(".test.ts") || line.includes("at Object.")
      );
      expect(hasExternalFrame).toBe(true);
    });
  });
});