const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise rejection that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // Check for presence of internal Q frames that should be filtered out
      // The original code filters these, but the mutated code (if true) won't
      const hasInternalFrames = stack.includes("at filterStackString") ||
                               stack.includes("at makeStackTraceLong") ||
                               stack.includes("at isInternalFrame");
      expect(hasInternalFrames).toBe(false);
    }
  });
});