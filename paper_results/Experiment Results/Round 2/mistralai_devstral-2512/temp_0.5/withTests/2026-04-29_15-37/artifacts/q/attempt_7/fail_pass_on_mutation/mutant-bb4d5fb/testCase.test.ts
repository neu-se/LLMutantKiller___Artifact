const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly identify and preserve external stack frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a named function that will appear in stack trace
    function testFunction() {
      return Q.Promise((resolve: any, reject: any) => {
        setTimeout(() => {
          try {
            throw new Error("Test error from testFunction");
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    return testFunction().catch((error: Error) => {
      const stackLines = error.stack.split('\n');

      // Look specifically for our testFunction frame
      const hasTestFunctionFrame = stackLines.some(line =>
        line.includes('testFunction') ||
        (line.includes('.test.ts') && line.includes('at '))
      );

      // In original code: should find our test function frame
      // In mutated code: all frames would be filtered (return true)
      expect(hasTestFunctionFrame).toBe(true);

      // Count total non-internal frames
      const externalFrames = stackLines.filter(line =>
        line.includes('at ') &&
        !line.includes('q.js') &&
        !line.includes('internal/') &&
        !line.includes('node:')
      );

      expect(externalFrames.length).toBeGreaterThan(0);
    });
  });
});