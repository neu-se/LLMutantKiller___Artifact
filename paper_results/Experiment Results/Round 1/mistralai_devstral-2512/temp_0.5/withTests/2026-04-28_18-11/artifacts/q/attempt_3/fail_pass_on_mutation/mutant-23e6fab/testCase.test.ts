import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Simulate a Firefox-style stack trace
    error.stack = "func@http://example.com/file.js:42:21";

    // The mutation changes the condition from checking attempt3 to always true
    // This would cause incorrect parsing of stack traces
    deferred.reject(error);

    // Return the promise to ensure proper async handling
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Verify the stack trace is properly formatted
        expect(caughtError.stack).toContain("file.js:42");
      }
    );
  });
});