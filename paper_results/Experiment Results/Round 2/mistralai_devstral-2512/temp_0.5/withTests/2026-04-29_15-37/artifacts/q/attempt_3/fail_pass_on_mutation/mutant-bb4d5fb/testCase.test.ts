const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        try {
          // Force an error to generate a stack trace
          throw new Error("Test error");
        } catch (error) {
          reject(error);
        }
      }, 0);
    });

    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // In the original code, internal frames should be filtered out
      // In the mutated code, all frames would be considered internal (return true)
      // This would result in an empty or very short stack trace
      const stackLines = error.stack.split('\n');
      const hasMultipleFrames = stackLines.length > 2;

      // The original code should preserve some external frames
      // The mutated code would filter everything, leaving minimal stack info
      expect(hasMultipleFrames).toBe(true);

      // Additional check: the stack should contain meaningful external frames
      // In the mutated version, this would likely fail as most frames would be filtered
      const hasExternalFrame = stackLines.some(line =>
        line.includes(".test.ts") || line.includes("at ") || line.includes("http:")
      );
      expect(hasExternalFrame).toBe(true);
    });
  });
});