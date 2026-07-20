// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly handle stack traces when fileNameAndLineNumber is falsy", () => {
    // Create a scenario where captureLine is called with a stack trace
    // that doesn't match any expected patterns (making fileNameAndLineNumber falsy)
    const originalErrorPrepareStackTrace = Error.prepareStackTrace;
    const originalErrorStackTraceLimit = Error.stackTraceLimit;

    try {
      // Set up an environment where stack traces won't match expected patterns
      Error.prepareStackTrace = (err, stack) => {
        return "Non-standard stack format";
      };
      Error.stackTraceLimit = 1;

      // Force stack trace capture by creating a promise with long stack support
      Q.longStackSupport = true;
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Create a rejection to trigger stack trace handling
      deferred.reject(new Error("Test error"));

      return promise.then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        (error) => {
          // In the original code, when fileNameAndLineNumber is falsy,
          // the code should still handle the error properly
          expect(error.message).toBe("Test error");
          // The mutation would cause different behavior when fileNameAndLineNumber is falsy
          // because it inverts the condition
          // This test should fail on the mutated code because the stack handling will be different
          expect(error.stack).toContain("Non-standard stack format");
        }
      );
    } finally {
      // Restore original settings
      Error.prepareStackTrace = originalErrorPrepareStackTrace;
      Error.stackTraceLimit = originalErrorStackTraceLimit;
      Q.longStackSupport = false;
    }
  });
});