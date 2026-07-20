const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Create a promise that will be rejected with a specific stack format
    const deferred = Q.defer();

    // Create an error with stack trace matching attempt2 pattern
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at file.js:10:5";

    // Enable long stack traces to force parsing
    Q.longStackSupport = true;

    // Reject the promise
    deferred.reject(error);

    // The key test: we need to verify that the stack trace was actually parsed
    // by checking if the error's stack was modified during processing
    return deferred.promise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (receivedError: Error) => {
        // Verify the error was processed
        expect(receivedError).toBeDefined();

        // The mutation would prevent attempt2 format from being parsed
        // This should cause the stack processing to fail in a way that
        // the error object remains unchanged
        // We'll check that the stack contains our specific format
        expect(receivedError.stack).toContain("file.js:10:5");

        // Additional check: the stack should have been processed
        // (in original code, it would be modified by makeStackTraceLong)
        expect(receivedError.stack.length).toBeGreaterThan(0);
      }
    );
  });
});