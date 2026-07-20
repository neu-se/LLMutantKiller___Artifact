const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a nested promise rejection to generate a longer stack trace
    const promise = Q.reject(new Error("test error"))
      .then(() => Q.reject(new Error("nested error")));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // The original code should filter internal frames, so the stack should be shorter
      // The mutated code with "if (true)" will include all frames making the stack longer
      const lineCount = stack.split('\n').length;
      // This threshold is based on the expected behavior difference
      expect(lineCount).toBeLessThan(15);
    }
  });
});