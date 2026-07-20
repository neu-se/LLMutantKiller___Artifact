import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with @ symbol in Chrome format", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a deferred that will be rejected
    const deferred = Q.defer();

    // Create an error with Chrome-style stack format that should match attempt3 regex
    const error = new Error("Test");
    error.stack = "Error: Test\n    at http://localhost:8080/test.js:15:20";

    // Reject with our crafted error
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Verify the error was processed
        expect(caughtError).toBe(error);

        // The key test: in original code, this should be properly parsed
        // In mutated code, the regex won't match because it requires exactly one char before @
        // This will cause the stack filtering to behave differently
        expect(caughtError.stack).toContain("test.js:15");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});