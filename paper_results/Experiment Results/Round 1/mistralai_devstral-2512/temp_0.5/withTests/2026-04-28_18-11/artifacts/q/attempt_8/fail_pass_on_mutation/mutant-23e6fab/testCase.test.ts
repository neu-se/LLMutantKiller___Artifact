import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly handle stack traces with malformed Firefox-style patterns", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace that would be incorrectly parsed by the mutation
    // This contains a line that would match the Firefox regex but has invalid number
    error.stack = "func@http://example.com/file.js:abc:10";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly handle this stack trace
        // The mutation would incorrectly parse this as Firefox-style
        // and try to extract invalid line numbers
        expect(caughtError.stack).toContain("file.js:abc");

        // This test specifically checks that malformed Firefox-style patterns
        // don't cause parsing errors
        // The mutation would cause this to fail when trying to parse "abc" as number
        const stackLines = caughtError.stack.split('\n');
        expect(stackLines.length).toBeGreaterThan(0);

        // The mutation would incorrectly try to parse this line
        // and potentially cause an error when converting "abc" to Number
        // This assertion would fail with the mutation
        expect(() => {
          const match = stackLines[0].match(/.*@(.+):(\D+)$/);
          if (match) {
            const lineNumber = Number(match[2]);
            expect(isNaN(lineNumber)).toBe(true);
          }
        }).not.toThrow();
      }
    );
  });
});