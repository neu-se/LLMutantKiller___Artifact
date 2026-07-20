const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should filter stack traces correctly based on filename", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        try {
          // Create error with specific filename in stack
          throw new Error("Test error");
        } catch (error) {
          reject(error);
        }
      }, 0);
    });

    return promise.catch((error: Error) => {
      const stackLines = error.stack.split('\n');

      // In original code: should preserve frames from files other than q.js
      // In mutated code: all frames would be filtered (return true)
      const hasNonQFrames = stackLines.some(line => {
        return line.includes('at ') &&
               !line.includes('q.js') &&
               !line.includes('internal/') &&
               !line.includes('node:');
      });

      expect(hasNonQFrames).toBe(true);

      // Count how many q.js frames remain (should be filtered in original)
      const qFrames = stackLines.filter(line =>
        line.includes('q.js')
      );

      // In original: q.js frames should be filtered out
      // In mutated: all frames filtered (return true)
      expect(qFrames.length).toBeLessThan(stackLines.length - 1);
    });
  });
});