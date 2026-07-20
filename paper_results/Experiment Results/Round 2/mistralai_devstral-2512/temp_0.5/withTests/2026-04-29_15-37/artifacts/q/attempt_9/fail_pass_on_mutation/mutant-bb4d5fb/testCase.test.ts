const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should preserve external stack frames when filtering", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        try {
          // Force an error with a specific stack trace
          throw new Error("Test error");
        } catch (error) {
          reject(error);
        }
      }, 0);
    });

    return promise.catch((error: Error) => {
      const stackLines = error.stack.split('\n');

      // Count frames that should be preserved (non-q.js frames)
      const preservedFrames = stackLines.filter(line =>
        line.includes('at ') &&
        !line.includes('q.js') &&
        !line.includes('internal/') &&
        !line.includes('node:')
      );

      // In original code: should have preserved external frames
      // In mutated code: all frames would be filtered (return true)
      expect(preservedFrames.length).toBeGreaterThan(0);

      // Check that we have more than just error message and empty lines
      const meaningfulLines = stackLines.filter(line =>
        line.trim() && !line.startsWith('Error:')
      );
      expect(meaningfulLines.length).toBeGreaterThan(2);
    });
  });
});