const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should not filter out all stack frames when long stack traces are enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create an error with a known stack
    const error = new Error("Test error with stack");
    const originalStack = error.stack;

    // Chain promises to create multiple stack frames
    deferred1.promise.then(() => {
      deferred2.reject(error);
    });

    deferred1.resolve();

    try {
      await deferred2.promise;
    } catch (e: any) {
      // In original code: should preserve some stack frames
      // In mutated code: all frames filtered (isInternalFrame returns true)
      expect(e.stack).toBeTruthy();
      expect(e.stack.length).toBeGreaterThan(0);

      // The stack should contain more than just the error message
      const stackLines = e.stack.split('\n');
      expect(stackLines.length).toBeGreaterThan(1);

      // Should contain at least one frame that's not just the error message
      expect(stackLines.some(line => line.includes('.js') || line.includes('at '))).toBe(true);
    } finally {
      Q.longStackSupport = false;
    }
  });
});