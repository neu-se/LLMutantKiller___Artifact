const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a simple test that exercises the stack trace parsing
    // by creating a promise rejection with a stack trace
    const deferred = Q.defer();
    let errorWithStack: Error | null = null;

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create an error with a specific stack trace format
      const error = new Error("Test error");
      error.stack = "Error: Test error\n" +
                   "    at TestFunction (/path/to/file.js:123:45)\n" +
                   "    at anotherFunction (/another/file.js:67:89)";

      deferred.reject(error);

      // Capture the error in the rejection handler
      deferred.promise.catch((err: Error) => {
        errorWithStack = err;
      });

      // Return a promise that checks the result
      return Q.delay(10).then(() => {
        expect(errorWithStack).not.toBeNull();
        expect(errorWithStack!.stack).toBeDefined();

        // The stack should still contain the function name pattern
        // If the mutation returns empty array, the stack filtering won't work properly
        const hasFunctionPattern = /at \w+ \(.+:\d+:\d+\)/.test(errorWithStack!.stack!);
        expect(hasFunctionPattern).toBe(true);
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});