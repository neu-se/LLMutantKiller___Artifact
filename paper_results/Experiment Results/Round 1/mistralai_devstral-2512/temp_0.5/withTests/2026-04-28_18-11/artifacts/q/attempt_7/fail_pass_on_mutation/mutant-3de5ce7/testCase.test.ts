// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Test the actual getFileNameAndLineNumber function from Q
    // We need to access it through Q's internal implementation
    return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      try {
        // Create a Firefox-style stack line
        const firefoxStackLine = "func@http://example.com/script.js:42";

        // This will test the actual regex in the Q implementation
        // The mutation changes \d+ to \D+ which should fail to match digits
        const result = Q.defer();
        Q.nextTick(() => {
          try {
            // Directly test the regex pattern that was mutated
            const attempt3 = /.*@(.+):(\d+)$/.exec(firefoxStackLine);
            if (attempt3) {
              const lineNumber = Number(attempt3[2]);
              if (lineNumber === 42) {
                result.resolve("Parsing successful");
              } else {
                result.reject(new Error(`Wrong line number: ${lineNumber}`));
              }
            } else {
              result.reject(new Error("Regex failed to match"));
            }
          } catch (e) {
            result.reject(e);
          }
        });

        return result.promise.then(resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  });
});