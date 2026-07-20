const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      // The mutation causes all frames to be filtered out, resulting in an empty stack
      // In the original code, internal Q frames should be filtered but not all frames
      expect(stack).toBeTruthy();
      expect(stack.split('\n').length).toBeGreaterThan(1);
    }
  });
});