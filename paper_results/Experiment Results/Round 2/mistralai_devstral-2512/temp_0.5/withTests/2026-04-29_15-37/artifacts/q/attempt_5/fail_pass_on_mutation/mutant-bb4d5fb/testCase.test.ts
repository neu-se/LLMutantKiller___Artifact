const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter internal stack frames from error traces", () => {
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
      const stackLines = error.stack.split('\n');

      // In original code: should have external frames remaining
      // In mutated code: all frames would be filtered (return true)
      const hasExternalFrames = stackLines.some(line =>
        (line.includes("at ") && !line.includes("q.js")) ||
        line.includes(".test.ts") ||
        line.includes("Timeout") ||
        line.includes("process.")
      );

      // This assertion will fail in mutated version because all frames
      // would be filtered out, leaving no external frames
      expect(hasExternalFrames).toBe(true);

      // Additional check: stack should not be empty
      expect(stackLines.length).toBeGreaterThan(1);
    });
  });
});