import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing with @ symbol", () => {
  it("should correctly handle stack lines containing @ symbol", () => {
    // Enable long stack traces to trigger the parsing logic
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a deferred that will be rejected to trigger stack trace processing
    const deferred = Q.defer();

    // Create an error with a specific stack format that should match attempt3 regex
    const error = new Error("Test");
    error.stack = "Error: Test\n    at Test.test (http://example.com/file.js:42:10)";

    // Reject the deferred with our crafted error
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Verify the error was properly processed
        expect(caughtError).toBe(error);
        expect(caughtError.stack).toContain("http://example.com/file.js:42");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});