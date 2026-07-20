const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Test the internal stack parsing by checking if stack frames are properly identified
    // We'll test this by creating a scenario where stack filtering should occur

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a deferred that will be rejected
      const deferred = Q.defer();
      let capturedError: Error | null = null;

      // Create an error with a stack trace that includes Q's internal frames
      const error = new Error("Test error");
      error.stack = "Error: Test error\n" +
                   "    at TestFunction (/path/to/q.js:100:20)\n" +
                   "    at anotherFunction (/user/code.js:42:10)";

      deferred.reject(error);

      // Capture the error
      deferred.promise.catch((err: Error) => {
        capturedError = err;
      });

      // Return a promise that checks the result
      return Q.delay(10).then(() => {
        expect(capturedError).not.toBeNull();
        expect(capturedError!.stack).toBeDefined();

        // The key test: with the mutation (returning empty array), the stack filtering
        // won't work properly and internal Q frames won't be filtered out
        // In the original code, internal frames should be filtered
        const stackLines = capturedError!.stack!.split('\n');
        const hasInternalFrame = stackLines.some(line =>
          line.includes('/q.js:') && line.includes('TestFunction')
        );

        // With the mutation, this should be true (frame not filtered)
        // With original code, this should be false (frame filtered)
        expect(hasInternalFrame).toBe(false);
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});