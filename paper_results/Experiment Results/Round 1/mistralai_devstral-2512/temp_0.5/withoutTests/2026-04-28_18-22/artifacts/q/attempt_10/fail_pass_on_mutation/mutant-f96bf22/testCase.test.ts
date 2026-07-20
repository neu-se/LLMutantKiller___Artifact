const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal frames
    const promise = Q.resolve()
      .then(() => { throw new Error("test error"); });

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // Check for the presence of specific internal Q functions in the stack
      // The original code filters these out, but the mutated code (if true) won't
      const hasFilterStackString = stack.includes("at filterStackString");
      const hasIsInternalFrame = stack.includes("at isInternalFrame");
      const hasGetFileNameAndLineNumber = stack.includes("at getFileNameAndLineNumber");

      // At least one of these should be false in original code, true in mutated
      expect(hasFilterStackString || hasIsInternalFrame || hasGetFileNameAndLineNumber).toBe(false);
    }
  });
});