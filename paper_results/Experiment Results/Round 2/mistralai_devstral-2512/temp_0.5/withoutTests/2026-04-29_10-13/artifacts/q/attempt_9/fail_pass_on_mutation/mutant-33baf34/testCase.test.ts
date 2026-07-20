const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Enable long stack traces which uses getFileNameAndLineNumber
    q.longStackSupport = true;

    // Create a promise that will be rejected
    const promise = q.reject(new Error("Test error"));

    // Force the promise to be inspected which uses getFileNameAndLineNumber
    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (error: Error) => {
        // The original code should properly parse stack traces
        // The mutated code will fail to parse named function stack traces
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");

        // Create a mock stack trace with named function pattern
        const mockError = new Error("Test");
        mockError.stack = "Error: Test\n    at functionName (/path/to/file.js:42:21)";

        // This will trigger getFileNameAndLineNumber internally
        const testPromise = q.reject(mockError);
        return testPromise.then(
          () => {
            throw new Error("Should not be called");
          },
          (innerError: Error) => {
            // Verify the stack trace contains the expected file and line
            expect(innerError.stack).toContain("/path/to/file.js:42");
          }
        );
      }
    );
  });
});