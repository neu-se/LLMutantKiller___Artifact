const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal Q frames from stack traces", () => {
    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: any) => {
      const stack = error.stack;
      // The mutation changes isInternalFrame to always return true
      // This means in the mutated version, ALL frames will be filtered
      // In the original version, only Q internal frames are filtered
      // We check for the presence of the test file frame in the stack
      const hasTestFileFrame = stack.includes("testCase.test.ts");

      // Original code should have the test file frame (not filtered)
      // Mutated code will filter everything including the test file frame
      expect(hasTestFileFrame).toBe(true);

      // Additionally check that Q internal frames are filtered out
      const hasQInternalFrames = stack.includes("q.js") &&
                                (stack.includes("isInternalFrame") ||
                                 stack.includes("filterStackString") ||
                                 stack.includes("makeStackTraceLong"));

      // Original code should NOT have these internal frames (they're filtered)
      // Mutated code WILL have them (not filtered properly)
      expect(hasQInternalFrames).toBe(false);
    });
  });
});