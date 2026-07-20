const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter internal Q frames from error stacks", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal frames
    const promise = Q.resolve()
      .then(() => { throw new Error("test error"); });

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // Count occurrences of Q internal function names in the stack
      const internalFrameCount = (stack.match(/at\s+(filterStackString|isInternalFrame|getFileNameAndLineNumber|makeStackTraceLong)/g) || []).length;
      // Original code should filter these out (count = 0)
      // Mutated code with "if (true)" will include them (count > 0)
      expect(internalFrameCount).toBe(0);
    }
  });
});