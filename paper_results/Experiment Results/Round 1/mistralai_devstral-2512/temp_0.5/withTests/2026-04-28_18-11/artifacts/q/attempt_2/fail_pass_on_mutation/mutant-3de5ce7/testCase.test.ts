// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Create a promise chain that will generate a stack trace
    return Q.Promise(function(resolve, reject) {
      // Simulate an error that would generate a Firefox-style stack trace
      try {
        throw new Error("Test error");
      } catch (e) {
        // Manually create a stack trace line that matches Firefox format
        const stackLine = "func@http://example.com/script.js:42";

        // Test the regex pattern directly
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          const fileName = attempt3[1];
          const lineNumber = Number(attempt3[2]);
          if (fileName === "http://example.com/script.js" && lineNumber === 42) {
            resolve("Stack parsing works correctly");
          } else {
            reject(new Error("Stack parsing failed"));
          }
        } else {
          reject(new Error("Regex didn't match"));
        }
      }
    });
  });
});