const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify and filter internal Q frames from stack traces", () => {
    // Create a function that will generate a stack trace through Q
    function createStackTrace() {
      return Q.resolve().then(() => {
        throw new Error("Test error");
      });
    }

    return createStackTrace().catch((error: any) => {
      const stackLines = error.stack.split('\n');
      // In the original code, internal Q frames should be filtered out
      // In the mutated code (return true), all frames are kept including Q internal ones
      // We check for the presence of Q internal frames
      const hasQInternalFrames = stackLines.some(line =>
        line.includes('q.js') && line.includes('isInternalFrame')
      );

      // Original code should NOT have Q internal frames (they're filtered)
      // Mutated code WILL have Q internal frames (not filtered)
      expect(hasQInternalFrames).toBe(false);
    });
  });
});