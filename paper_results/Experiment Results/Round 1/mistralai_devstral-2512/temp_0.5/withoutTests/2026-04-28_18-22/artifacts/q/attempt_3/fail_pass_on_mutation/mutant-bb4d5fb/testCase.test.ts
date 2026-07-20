const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should not contain Q internal frames when filtered
      const stack = error.stack;
      // In the original code, internal Q frames are filtered out
      // In the mutated code, all frames are kept (return true)
      // We can detect this by checking if the stack contains Q internal references
      expect(stack).not.toContain("q.js");
    }
  });
});