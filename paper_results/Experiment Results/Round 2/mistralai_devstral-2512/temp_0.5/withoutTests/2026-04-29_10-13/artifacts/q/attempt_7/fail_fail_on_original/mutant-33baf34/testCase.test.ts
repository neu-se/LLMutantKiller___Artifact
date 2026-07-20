const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise that will trigger long stack trace generation
    q.longStackSupport = true;

    // Create a chain of promises to generate stack traces
    const promise = q.reject(new Error("Test error"));

    // Force the promise to be inspected which uses getFileNameAndLineNumber
    return q.delay(promise, 1).then(
      () => {
        throw new Error("Should not be called");
      },
      (error) => {
        // The original code should properly parse stack traces
        // The mutated code will fail to parse named function stack traces
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");

        // Create a mock stack trace with named function pattern
        const mockError = new Error("Test");
        mockError.stack = "Error: Test\n    at functionName (/path/to/file.js:42:21)";

        // This will trigger getFileNameAndLineNumber internally
        const filtered = q.filterStackString(mockError.stack);
        expect(filtered).toContain("/path/to/file.js:42");
      }
    );
  });
});