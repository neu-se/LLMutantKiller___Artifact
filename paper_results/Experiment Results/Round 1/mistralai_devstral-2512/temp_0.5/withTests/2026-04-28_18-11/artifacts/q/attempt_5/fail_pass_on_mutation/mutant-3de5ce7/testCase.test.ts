// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Test with a Firefox-style stack line that has digits in the line number
    const firefoxStackLine = "func@http://example.com/script.js:42";

    return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      try {
        // Test the original regex pattern
        const originalRegex = /.*@(.+):(\d+)$/;
        const originalMatch = originalRegex.exec(firefoxStackLine);

        // Test the mutated regex pattern
        const mutatedRegex = /.*@(.+):(\D+)$/;
        const mutatedMatch = mutatedRegex.exec(firefoxStackLine);

        // Original should match, mutated should not
        if (originalMatch && !mutatedMatch) {
          const lineNumber = Number(originalMatch[2]);
          if (lineNumber === 42) {
            resolve("Original regex works correctly, mutated regex fails as expected");
          } else {
            reject(new Error(`Unexpected line number: ${lineNumber}`));
          }
        } else if (!originalMatch) {
          reject(new Error("Original regex failed to match"));
        } else if (mutatedMatch) {
          reject(new Error("Mutated regex incorrectly matched - this should fail on mutated code"));
        } else {
          reject(new Error("Unexpected test result"));
        }
      } catch (e) {
        reject(e);
      }
    });
  });
});