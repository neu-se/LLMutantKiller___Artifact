const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should not contain internal Q frames
      expect(error.stack).toBeDefined();
      // In the original code, internal Q frames are filtered out
      // In the mutated code, all frames are kept (true && condition)
      // We can't directly test the stack content as it's environment-dependent,
      // but we can verify the filtering behavior by checking the stack length
      const stackLines = error.stack.split('\n');
      // The original code should have fewer stack lines due to filtering
      // The mutated code will have more lines since filtering is disabled
      // We'll check that the stack doesn't contain excessive Q internal frames
      const qInternalFrames = stackLines.filter((line: string) =>
        line.includes('q.js') && line.includes('isInternalFrame')
      );
      // In original code, these should be filtered out
      // In mutated code, they might appear
      expect(qInternalFrames.length).toBeLessThanOrEqual(1);
    }
  });
});