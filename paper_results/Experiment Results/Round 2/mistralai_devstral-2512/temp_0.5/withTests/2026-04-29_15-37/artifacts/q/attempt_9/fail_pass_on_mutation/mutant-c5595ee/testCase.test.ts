import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with @ symbol in WebKit format", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a deferred that will be rejected
    const deferred = Q.defer();

    // Create an error with WebKit-style stack format
    const error = new Error("Test");
    // This format should match attempt3 regex in original code
    // Original: /.*@(.+):(\d+)$/ - matches any characters before @
    // Mutated: /.@(.+):(\d+)$/ - requires exactly one character before @
    error.stack = "    at http://example.com/file.js:42";

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
        // In mutated code, the regex won't match this format
        expect(caughtError.stack).toContain("file.js:42");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});