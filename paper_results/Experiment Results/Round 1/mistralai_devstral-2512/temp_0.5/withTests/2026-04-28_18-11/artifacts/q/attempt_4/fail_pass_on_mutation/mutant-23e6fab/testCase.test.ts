import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly handle non-Firefox stack traces", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Simulate a non-Firefox stack trace that would incorrectly match
    // the mutated attempt3 regex
    error.stack = "at http://example.com/file.js:42:21";

    // The mutation changes the condition from checking attempt3 to always true
    // This would cause incorrect parsing of non-Firefox stack traces
    deferred.reject(error);

    // Return the promise to ensure proper async handling
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Verify the stack trace is properly formatted
        // The mutation would incorrectly parse this as Firefox-style
        expect(caughtError.stack).toContain("file.js:42");
        // This assertion would fail with the mutation because
        // it would incorrectly try to parse the line number
        expect(caughtError.stack).not.toContain("NaN");
      }
    );
  });
});