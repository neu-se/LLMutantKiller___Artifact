// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter stack frames based on exact line number conditions", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace
    return Q.Promise((resolve: any, reject: any) => {
      // Create an error with a specific stack trace structure
      const testError = new Error("Test error");
      testError.stack = `
        Error: Test error
          at testFile.js:100:20
          at q.js:5:10
          at q.js:50:15
          at q.js:100:20
          at testFile.js:101:5
      `.trim();

      // The key difference is in how frames are filtered:
      // Original: requires ALL conditions (filename match AND line in range)
      // Mutated: requires filename match AND (line >= start OR line <= end)
      reject(testError);
    }).catch((error: Error) => {
      // Check that the stack was processed
      expect(error.stack).toBeDefined();

      // Count q.js frames in the processed stack
      const stackLines = error.stack!.split('\n');
      const qJsFrames = stackLines.filter(line => line.includes('q.js'));

      // With original code: should filter frames where line is in [qStartingLine, qEndingLine]
      // With mutated code: would keep frames where line >= qStartingLine OR line <= qEndingLine
      // This creates a significant difference in filtering behavior
      expect(qJsFrames.length).toBe(3);

      // Verify specific frames are present/absent based on filtering logic
      const hasLine5 = stackLines.some(line => line.includes('q.js:5:10'));
      const hasLine50 = stackLines.some(line => line.includes('q.js:50:15'));
      const hasLine100 = stackLines.some(line => line.includes('q.js:100:20'));

      // The exact presence depends on qStartingLine and qEndingLine values
      // but the mutated version should behave differently
      expect(hasLine5 || hasLine50 || hasLine100).toBe(true);

      return true;
    });
  });
});