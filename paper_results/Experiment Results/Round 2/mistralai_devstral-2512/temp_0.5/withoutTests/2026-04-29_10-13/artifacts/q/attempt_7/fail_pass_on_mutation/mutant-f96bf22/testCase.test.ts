const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should not filter all stack frames when mutation is present", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // The mutation changes the filter condition to always return true
      // which would remove ALL frames from the stack
      // We check that the stack contains more than just the error message
      const stackLines = stack.split('\n');
      const hasStackFrames = stackLines.length > 1;

      // Original code should have stack frames
      // Mutation would remove all frames
      expect(hasStackFrames).toBe(true);
    }
  });
});