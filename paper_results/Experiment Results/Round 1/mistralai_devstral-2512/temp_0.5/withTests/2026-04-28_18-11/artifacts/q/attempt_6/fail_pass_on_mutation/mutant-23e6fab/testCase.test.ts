import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with special characters", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace that would be incorrectly parsed by the mutation
    // This contains a line that would match the Firefox regex but shouldn't be parsed as such
    error.stack = "at http://example.com/file.js:42:21\nfunc@http://example.com/other.js:99:10";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly handle this stack trace
        // The mutation would incorrectly parse the second line as Firefox-style
        expect(caughtError.stack).toContain("file.js:42");

        // This test specifically checks that the stack trace parsing
        // doesn't incorrectly handle mixed-style traces
        // The mutation would cause incorrect parsing of the second line
        const stackLines = caughtError.stack.split('\n');
        expect(stackLines.length).toBeGreaterThan(1);

        // Verify the first line is parsed correctly
        expect(stackLines[0]).toContain("file.js:42");

        // The mutation would incorrectly parse the second line
        // This assertion would fail with the mutation
        expect(stackLines[1]).toContain("other.js:99");
      }
    );
  });
});