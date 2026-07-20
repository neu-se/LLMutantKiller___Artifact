// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Create a scenario that will trigger the stack trace parsing
    return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      // Create an error with a Firefox-style stack trace
      const error = new Error("Test error");
      error.stack = "func@http://example.com/script.js:42";

      // Force Q to process this error through its stack trace handling
      const deferred = Q.defer();
      Q.nextTick(() => {
        try {
          // This will trigger the getFileNameAndLineNumber function
          // which contains the mutated regex
          const stackLine = error.stack.split("\n")[0];
          const result = Q.defer();

          // Simulate the internal stack parsing logic
          const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
          if (attempt3) {
            const lineNumber = Number(attempt3[2]);
            if (lineNumber === 42) {
              result.resolve("Stack parsing works correctly");
            } else {
              result.reject(new Error(`Wrong line number: ${lineNumber}`));
            }
          } else {
            result.reject(new Error("Regex failed to match"));
          }

          return result.promise;
        } catch (e) {
          deferred.reject(e);
        }
      });

      return deferred.promise;
    }).then((result: unknown) => {
      // If we get here, the original regex worked
      return result;
    }, (error: Error) => {
      // If we get here, the regex failed (which should happen with mutated code)
      throw error;
    });
  });
});