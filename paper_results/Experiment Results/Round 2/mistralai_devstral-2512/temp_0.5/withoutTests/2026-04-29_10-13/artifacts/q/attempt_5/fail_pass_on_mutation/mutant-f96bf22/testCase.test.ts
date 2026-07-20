const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter stack traces and not remove all frames", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace with multiple frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve().then(() => {
          throw new Error("Test error with stack");
        });
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // The mutation changes the filter condition to always return true
      // which would remove ALL frames from the stack
      // Original code should preserve at least some frames
      const stackLines = stack.split('\n');
      const hasApplicationFrames = stackLines.some(line =>
        line.includes('.test.ts') || line.includes('at ') || line.includes('Test error')
      );

      expect(hasApplicationFrames).toBe(true);
      expect(stackLines.length).toBeGreaterThan(2);
    }
  });
});