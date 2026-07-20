const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise rejection that will generate internal frames
    const promise = Q.reject(new Error("test error"));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // Check for the specific pattern that indicates internal frames are being filtered
      // The original code should not include these internal frames
      // The mutated code with "if (true)" will include them
      const hasQInternalFrames = stack.includes("q.js") &&
                               (stack.includes("filterStackString") ||
                                stack.includes("isInternalFrame") ||
                                stack.includes("getFileNameAndLineNumber"));
      expect(hasQInternalFrames).toBe(false);
    }
  });
});