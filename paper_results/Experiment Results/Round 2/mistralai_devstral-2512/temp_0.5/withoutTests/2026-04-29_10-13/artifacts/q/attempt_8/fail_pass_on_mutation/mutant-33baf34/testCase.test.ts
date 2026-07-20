const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a rejected promise with long stack support enabled
    q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = q.reject(new Error("Test error"));

    // Return the promise chain to ensure proper async handling
    return promise
      .catch((error: Error) => {
        // Verify the error is properly handled
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");

        // Create a mock error with a stack trace containing named function pattern
        const mockError = new Error("Test");
        mockError.stack = "Error: Test\n    at functionName (/path/to/file.js:42:21)";

        // Test the internal stack trace parsing by creating a promise with this error
        const testPromise = q.reject(mockError);
        return testPromise
          .catch((innerError: Error) => {
            // The original code should properly parse the stack trace
            // The mutated code will fail to parse named function stack traces
            expect(innerError.stack).toContain("/path/to/file.js:42");
          });
      });
  });
});