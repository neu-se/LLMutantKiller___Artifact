const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should not contain internal Q frames
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Check that the stack trace doesn't contain Q's internal frames
      // In the original code, internal frames are filtered out
      // In the mutated code, internal frames would be included
      const hasInternalFrame = stack?.includes("q.js") || stack?.includes("filterStackString");
      expect(hasInternalFrame).toBe(false);
    }
  });
});