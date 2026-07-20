const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Test the stack trace parsing by creating a scenario that exercises the getFileNameAndLineNumber function
    // We'll do this by creating a promise rejection and checking if the stack trace is properly processed

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a deferred that will be rejected with a specific stack trace
      const deferred = Q.defer();
      let capturedStack: string | null = null;

      // Create an error with a stack trace that matches the function name pattern
      const error = new Error("Test error");
      error.stack = "Error: Test error\n" +
                   "    at TestFunction (/path/to/file.js:123:45)\n" +
                   "    at anotherFunction (/another/file.js:67:89)";

      deferred.reject(error);

      // Capture the stack trace after it's been processed
      deferred.promise.then(
        () => {},
        (err: Error) => {
          capturedStack = err.stack;
        }
      );

      // Return a promise that checks the result
      return Q.delay(10).then(() => {
        expect(capturedStack).not.toBeNull();

        // The key test: check if the stack trace contains the expected pattern
        // With the original code, the pattern should be preserved
        // With the mutated code (returning empty array), the pattern might be lost
        const hasExpectedPattern = /at \w+ \(\/path\/to\/file\.js:123:45\)/.test(capturedStack!);
        expect(hasExpectedPattern).toBe(true);
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});