const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve application stack frames in error traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deeply nested promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve().then(() => {
          return Q.delay(1).then(() => {
            throw new Error("Deep test error");
          });
        });
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // The mutation changes the filter condition to always return true
      // which would remove ALL frames. We check for specific application frames
      // that should remain in the original code but would be removed by the mutation
      const stackLines = stack.split('\n');
      const hasApplicationFrames = stackLines.some(line =>
        (line.includes('testCase.test.ts') && line.includes('at ')) ||
        (line.includes('Deep test error') && !line.includes('q.js'))
      );

      // Original code should preserve application frames
      // Mutation would remove all frames
      expect(hasApplicationFrames).toBe(true);
      expect(stackLines.length).toBeGreaterThan(4);
    }
  });
});