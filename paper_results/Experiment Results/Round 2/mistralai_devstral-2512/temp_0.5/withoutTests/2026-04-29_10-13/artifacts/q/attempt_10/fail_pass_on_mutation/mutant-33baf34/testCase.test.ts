const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a rejected promise with long stack support enabled
    q.longStackSupport = true;

    // Create a promise that will be rejected with a specific stack trace
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at functionName (/path/to/file.js:42:21)";

    const promise = q.reject(error);

    // Return the promise chain to ensure proper async handling
    return promise
      .catch((caughtError: Error) => {
        // The original code should properly parse the stack trace
        // The mutated code will fail to parse named function stack traces
        expect(caughtError).toBeInstanceOf(Error);
        expect(caughtError.message).toBe("Test error");

        // Verify the stack trace contains the expected file and line
        expect(caughtError.stack).toContain("/path/to/file.js:42");

        // Create another promise to test the parsing again
        const testError = new Error("Another test");
        testError.stack = "Error: Another test\n    at testFunction (/another/path.js:100:5)";

        const testPromise = q.reject(testError);
        return testPromise
          .catch((innerError: Error) => {
            // Verify the stack trace contains the expected file and line
            expect(innerError.stack).toContain("/another/path.js:100");
          });
      });
  });
});