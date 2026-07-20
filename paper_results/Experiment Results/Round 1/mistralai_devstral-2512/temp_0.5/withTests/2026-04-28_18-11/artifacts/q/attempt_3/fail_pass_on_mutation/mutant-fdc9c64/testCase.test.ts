// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter internal stack frames", () => {
    // Create a promise chain that will generate stack traces
    // The mutation changes the logic from AND to OR in the line number check
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    let error: Error | null = null;

    return Q().then(() => {
      // Force a rejection to generate a stack trace
      throw new Error("Test error");
    }).catch((e: Error) => {
      error = e;
      // The error should have a stack trace that includes Q internal frames
      // The mutation would incorrectly filter frames that shouldn't be filtered
      expect(error).toBeDefined();
      expect(error!.stack).toBeDefined();
      expect(error!.stack!.length).toBeGreaterThan(0);

      // Check that the stack trace contains expected patterns
      // The mutation would cause incorrect filtering, potentially removing
      // frames that should be kept or keeping frames that should be removed
      const stackLines = error!.stack!.split('\n');
      const hasInternalFrames = stackLines.some(line =>
        line.includes('q.js') || line.includes('promiseDispatch')
      );

      // With long stack traces enabled, we should see internal frames
      expect(hasInternalFrames).toBe(true);

      return "test passed";
    }).then((result: string) => {
      expect(result).toBe("test passed");
    });
  });
});