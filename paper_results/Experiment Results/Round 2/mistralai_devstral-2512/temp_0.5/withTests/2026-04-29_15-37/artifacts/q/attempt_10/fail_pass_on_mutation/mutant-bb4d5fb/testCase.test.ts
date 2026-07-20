const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter internal stack frames", () => {
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

      // Count frames that are NOT from q.js (should be preserved in original)
      const externalFrames = lines.filter(line =>
        line.includes('at ') &&
        !line.includes('q.js') &&
        !line.includes('internal/') &&
        !line.includes('node:')
      );

      // In original code: should have external frames
      // In mutated code: all frames filtered (return true)
      expect(externalFrames.length).toBeGreaterThan(0);

      // Check that the stack contains our test file
      const hasTestFile = lines.some(line =>
        line.includes('.test.ts') || line.includes('at test')
      );

      expect(hasTestFile).toBe(true);
    });
  });
});