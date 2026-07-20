const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should preserve non-q.js frames in stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        try {
          throw new Error("Test error");
        } catch (error) {
          reject(error);
        }
      }, 0);
    });

    return promise.catch((error: Error) => {
      const stack = error.stack;
      const lines = stack.split('\n');

      // Count frames that are NOT from q.js
      const nonQFrames = lines.filter(line =>
        line.includes('at ') &&
        !line.includes('q.js') &&
        !line.includes('(internal/') &&
        !line.includes('node:')
      );

      // In original code: should have some non-q.js frames
      // In mutated code: all frames would be filtered (return true)
      expect(nonQFrames.length).toBeGreaterThan(0);

      // Also check that we have more than just the error message line
      expect(lines.length).toBeGreaterThan(2);
    });
  });
});