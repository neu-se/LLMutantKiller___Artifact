// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter stack frames with line numbers outside range", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace with specific characteristics
    return Q.Promise((resolve: any, reject: any) => {
      // Create an error with a stack trace that has frames at specific line numbers
      const testError = new Error("Test error");
      testError.stack = `
        Error: Test error
          at testFile.js:100:20
          at q.js:1:10
          at q.js:50:15
          at q.js:200:20
          at testFile.js:101:5
      `.trim();

      // The key difference is in how line 1 is handled:
      // Original: line 1 would be filtered if qStartingLine > 1 (likely)
      // Mutated: line 1 would ALWAYS be kept because of "lineNumber <= qEndingLine"
      reject(testError);
    }).catch((error: Error) => {
      // Check that the stack was processed
      expect(error.stack).toBeDefined();

      // Count q.js frames in the processed stack
      const stackLines = error.stack!.split('\n');
      const qJsFrames = stackLines.filter(line => line.includes('q.js'));

      // With original code: line 1 should be filtered out if qStartingLine > 1
      // With mutated code: line 1 would be kept because of the OR condition
      // We expect the original to filter more aggressively
      expect(qJsFrames.length).toBe(2);

      // Verify line 1 is filtered out in original but kept in mutated
      const hasLine1 = stackLines.some(line => line.includes('q.js:1:10'));
      expect(hasLine1).toBe(false);

      return true;
    });
  });
});