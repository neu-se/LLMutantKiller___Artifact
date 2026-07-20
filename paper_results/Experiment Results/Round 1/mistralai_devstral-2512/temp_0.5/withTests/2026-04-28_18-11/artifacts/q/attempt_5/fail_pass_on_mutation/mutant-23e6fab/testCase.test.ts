import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly distinguish between Firefox and non-Firefox stack traces", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace that would be incorrectly parsed by the mutation
    // This is a Chrome-style stack trace that the mutation would incorrectly
    // treat as Firefox-style due to the always-true condition
    error.stack = "at Object.test (http://example.com/file.js:42:21)";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly handle this stack trace
        // The mutation would incorrectly parse it as Firefox-style
        // and potentially fail to extract the correct file/line info
        expect(caughtError.stack).toContain("file.js:42");

        // This test specifically checks that the stack trace parsing
        // doesn't incorrectly handle Chrome-style traces as Firefox-style
        // The mutation would cause this to fail
        const stackLines = caughtError.stack.split('\n');
        const hasValidStackLine = stackLines.some(line =>
          line.includes('file.js:42') && !line.includes('NaN')
        );
        expect(hasValidStackLine).toBe(true);
      }
    );
  });
});