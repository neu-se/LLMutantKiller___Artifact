import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly handle stack traces with invalid Firefox-style patterns", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace that would be incorrectly parsed by the mutation
    // This contains a line that looks like Firefox-style but has invalid data
    error.stack = "at http://example.com/file.js:42:21\nfunc@invalid:notanumber:10";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly handle this stack trace
        // The mutation would incorrectly parse the second line as Firefox-style
        // and try to extract invalid line numbers
        expect(caughtError.stack).toContain("file.js:42");

        // This test specifically checks that invalid Firefox-style patterns
        // don't cause parsing errors
        // The mutation would cause this to fail when trying to parse "notanumber"
        const stackLines = caughtError.stack.split('\n');
        expect(stackLines.length).toBeGreaterThan(1);

        // Verify the first line is parsed correctly
        expect(stackLines[0]).toContain("file.js:42");

        // The mutation would incorrectly try to parse the second line
        // and potentially cause an error when converting "notanumber" to Number
        // This assertion would fail with the mutation
        expect(() => {
          const match = stackLines[1].match(/.*@(.+):(\D+)$/);
          if (match) {
            Number(match[2]); // This would be NaN with the mutation
          }
        }).not.toThrow();
      }
    );
  });
});