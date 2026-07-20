const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should preserve external stack frames in error traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function externalFunction() {
      return Q.Promise((resolve: any, reject: any) => {
        setTimeout(() => {
          try {
            throw new Error("Test error from external function");
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    return externalFunction().catch((error: Error) => {
      const stackLines = error.stack.split('\n');

      // In original code: external frames should remain after filtering
      // In mutated code: all frames would be filtered (return true)
      const hasExternalFrame = stackLines.some(line =>
        line.includes("externalFunction") ||
        (line.includes(".test.ts") && !line.includes("q.js"))
      );

      expect(hasExternalFrame).toBe(true);

      // Count how many frames remain after filtering
      // Original code should have more frames than mutated version
      const frameCount = stackLines.length;
      expect(frameCount).toBeGreaterThan(3);
    });
  });
});