// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter stack frames with line numbers at boundaries", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace
    return Q.Promise((resolve: any, reject: any) => {
      // Create an error with a stack trace that has frames at boundary conditions
      const testError = new Error("Test error");
      testError.stack = `
        Error: Test error
          at testFile.js:100:20
          at q.js:1:10
          at q.js:9999:15
          at testFile.js:101:5
      `.trim();

      // The key difference is in boundary condition handling:
      // Original: line 1 would be filtered if qStartingLine > 1
      // Original: line 9999 would be filtered if qEndingLine < 9999
      // Mutated: line 1 would be kept because of "lineNumber <= qEndingLine"
      // Mutated: line 9999 would be kept because of "lineNumber >= qStartingLine"
      reject(testError);
    }).catch((error: Error) => {
      // Check that the stack was processed
      expect(error.stack).toBeDefined();

      // Count q.js frames in the processed stack
      const stackLines = error.stack!.split('\n');
      const qJsFrames = stackLines.filter(line => line.includes('q.js'));

      // With original code: both boundary frames should be filtered
      // With mutated code: both boundary frames would be kept
      expect(qJsFrames.length).toBe(0);

      // Verify boundary frames are filtered in original but kept in mutated
      const hasLine1 = stackLines.some(line => line.includes('q.js:1:10'));
      const hasLine9999 = stackLines.some(line => line.includes('q.js:9999:15'));

      expect(hasLine1).toBe(false);
      expect(hasLine9999).toBe(false);

      return true;
    });
  });
});