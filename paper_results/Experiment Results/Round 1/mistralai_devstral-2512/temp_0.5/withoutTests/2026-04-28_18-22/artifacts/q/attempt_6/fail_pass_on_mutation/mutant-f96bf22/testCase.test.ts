const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise rejection with a specific error message
    const error = new Error("test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      // The original code should filter internal frames, so the stack should not contain
      // the specific internal function names that are being filtered
      // The mutated code with "if (true)" will include these frames
      expect(stack).not.toMatch(/at\s+filterStackString\s+/);
      expect(stack).not.toMatch(/at\s+isInternalFrame\s+/);
      expect(stack).not.toMatch(/at\s+getFileNameAndLineNumber\s+/);
    }
  });
});