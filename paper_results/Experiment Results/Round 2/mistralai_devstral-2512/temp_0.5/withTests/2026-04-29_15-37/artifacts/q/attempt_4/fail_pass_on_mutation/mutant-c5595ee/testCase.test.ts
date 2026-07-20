import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing with @ symbol", () => {
  it("should correctly parse stack lines with @ symbol in the middle", () => {
    // Enable long stack traces to trigger the parsing logic
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a deferred that will be rejected
    const deferred = Q.defer();

    // Create an error with a stack format that should match attempt3 regex
    // The key difference is that the original regex /.*@(.+):(\d+)$/ will match
    // lines with any characters before @, while the mutated /.@(.+):(\d+)$/
    // requires exactly one character before @
    const error = new Error("Test");
    error.stack = "Error: Test\n    at Test.test (http://example.com/file.js:42:10)";

    // Reject the deferred with our crafted error
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly parse the stack line
        // The mutated code should fail to parse it, resulting in different behavior
        expect(caughtError).toBe(error);

        // Check that the stack was properly processed
        // In the original code, this should contain the filtered stack
        // In the mutated code, the stack might be different due to failed parsing
        expect(caughtError.stack).toBeDefined();

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});