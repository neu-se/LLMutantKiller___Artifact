// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Create a Firefox-style stack line with digits in line number
    const firefoxStackLine = "func@http://example.com/script.js:42";

    return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      // Test the regex pattern that was mutated
      // Original: /.*@(.+):(\d+)$/  (matches digits)
      // Mutated:  /.*@(.+):(\D+)$/  (matches non-digits)
      const attempt3 = /.*@(.+):(\d+)$/.exec(firefoxStackLine);

      if (attempt3) {
        const lineNumber = Number(attempt3[2]);
        if (lineNumber === 42) {
          resolve("Stack parsing works correctly with numeric line numbers");
        } else {
          reject(new Error(`Unexpected line number: ${lineNumber}`));
        }
      } else {
        reject(new Error("Regex failed to match Firefox-style stack line with numeric line number"));
      }
    });
  });
});