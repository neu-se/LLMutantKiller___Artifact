const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve non-internal stack frames", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple levels to generate stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve().then(() => {
          return Q.delay(1).then(() => {
            throw new Error("Test error");
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
      // which would remove ALL frames. We check for specific patterns
      // that should remain in the original code but would be removed by the mutation
      const stackLines = stack.split('\n');
      const hasTestFileFrame = stackLines.some(line =>
        line.includes('testCase.test.ts') || line.includes('at ')
      );

      // Original code should preserve some application frames
      // Mutation would remove all frames
      expect(hasTestFileFrame).toBe(true);
      expect(stackLines.length).toBeGreaterThan(3);
    }
  });
});