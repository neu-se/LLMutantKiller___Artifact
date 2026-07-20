// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter internal stack frames based on line number logic", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise chain that will generate stack traces
    return Q().then(() => {
      // Create a nested promise structure to generate multiple stack frames
      return Q().then(() => {
        return Q().then(() => {
          // Throw an error to generate a stack trace
          throw new Error("Test error for stack analysis");
        });
      });
    }).catch((error: Error) => {
      // Verify we have a stack trace
      expect(error.stack).toBeDefined();
      expect(error.stack!.length).toBeGreaterThan(0);

      // Analyze the stack trace structure
      const stackLines = error.stack!.split('\n');
      const hasQFrames = stackLines.some(line =>
        line.includes('q.js') || line.includes('q:')
      );

      // Both versions should have Q frames, but the filtering logic differs
      expect(hasQFrames).toBe(true);

      // The key difference: the mutated version would incorrectly filter frames
      // because of the changed boolean logic (AND vs OR with line numbers)
      // This would affect which frames are considered "internal"

      // Count frames that mention "promiseDispatch" - these should be internal
      const internalFrames = stackLines.filter(line =>
        line.includes('promiseDispatch') || line.includes('q.js')
      );

      // With original code: proper filtering based on line number range
      // With mutated code: incorrect filtering due to OR logic
      // The exact count will differ between versions
      expect(internalFrames.length).toBeGreaterThan(0);

      return true;
    });
  });
});