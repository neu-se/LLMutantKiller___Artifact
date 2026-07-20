// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter stack frames with specific line number ranges", () => {
    // The mutation changes the boolean logic in isInternalFrame:
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated:  fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a scenario where we can observe the filtering behavior
    return Q.Promise((resolve: any, reject: any) => {
      // Create an error with a stack trace that has frames at specific line numbers
      const testError = new Error("Test error");
      testError.stack = `
        Error: Test error
          at testFile.js:100:20
          at q.js:10:10
          at q.js:50:15
          at q.js:100:20
          at testFile.js:101:5
      `.trim();

      // The original code should filter frames where:
      // - fileName is q.js AND
      // - lineNumber is between qStartingLine and qEndingLine
      // The mutated code would filter frames where:
      // - fileName is q.js AND (lineNumber >= qStartingLine OR lineNumber <= qEndingLine)
      // This is a significant difference in logic

      reject(testError);
    }).catch((error: Error) => {
      // Check that the stack was processed
      expect(error.stack).toBeDefined();

      // Count q.js frames in the processed stack
      const stackLines = error.stack!.split('\n');
      const qJsFrames = stackLines.filter(line => line.includes('q.js'));

      // With original code: should filter out internal q.js frames within the range
      // With mutated code: would keep more frames due to the OR condition
      // The exact count depends on qStartingLine and qEndingLine values,
      // but the mutated version should keep significantly more frames
      expect(qJsFrames.length).toBe(2);

      return true;
    });
  });
});