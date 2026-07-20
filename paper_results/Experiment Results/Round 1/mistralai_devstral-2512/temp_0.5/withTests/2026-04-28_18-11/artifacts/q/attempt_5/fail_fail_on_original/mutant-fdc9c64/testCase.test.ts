// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly identify internal frames with specific line numbers", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace with specific characteristics
    return Q.Promise((resolve: any, reject: any) => {
      // Force a rejection with a custom error that we can track
      const testError = new Error("Test error for frame filtering");
      testError.stack = `
        Error: Test error for frame filtering
          at TestContext.<anonymous> (testFile.js:100:20)
          at q.js:50:10
          at q.js:200:15
          at testFile.js:101:5
      `.trim();

      // The original code should filter out q.js frames between qStartingLine and qEndingLine
      // The mutated code would incorrectly keep frames due to the OR condition
      reject(testError);
    }).catch((error: Error) => {
      // Verify the stack trace was processed correctly
      expect(error.stack).toBeDefined();

      // Count q.js frames in the processed stack
      const stackLines = error.stack!.split('\n');
      const qJsFrames = stackLines.filter(line => line.includes('q.js'));

      // With original code: should filter out internal q.js frames (lines 50 and 200)
      // With mutated code: would keep more frames due to incorrect OR logic
      // We expect exactly 1 q.js frame to remain (or none, depending on filtering)
      expect(qJsFrames.length).toBeLessThanOrEqual(1);

      // The key difference: mutated code would keep frames that should be filtered
      // because lineNumber <= qEndingLine would be true for many frames
      return true;
    }).then((result: boolean) => {
      expect(result).toBe(true);
    });
  });
});