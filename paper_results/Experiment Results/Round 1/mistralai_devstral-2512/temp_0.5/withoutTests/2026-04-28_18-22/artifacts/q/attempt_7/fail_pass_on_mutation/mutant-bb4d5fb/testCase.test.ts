const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify internal Q frames", () => {
    // Create a function that will generate a stack trace through Q
    function createStackTrace() {
      return Q.resolve().then(() => {
        throw new Error("Test error");
      });
    }

    return createStackTrace().catch((error: any) => {
      const stack = error.stack;
      // The mutation changes isInternalFrame to always return true
      // This means in the mutated version, ALL frames will be filtered
      // In the original version, only Q internal frames are filtered
      // We check for the presence of specific Q internal frame markers
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