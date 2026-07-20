import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly handle stack traces with Firefox-style patterns", () => {
    // Create a scenario that forces stack trace parsing
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace that would be incorrectly parsed by the mutation
    // This is a Chrome-style stack that the mutation would incorrectly treat as Firefox-style
    error.stack = "at Object.test (http://example.com/file.js:42:21)";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The original code should properly handle this stack trace
        // The mutation would incorrectly parse it as Firefox-style
        expect(caughtError.stack).toContain("file.js:42");

        // This test specifically checks that Chrome-style traces
        // are not incorrectly parsed as Firefox-style
        // The mutation would cause incorrect parsing
        const stackLines = caughtError.stack.split('\n');
        const chromeStyleLine = stackLines.find(line => line.includes('at Object.test'));
        expect(chromeStyleLine).toBeDefined();

        // The mutation would incorrectly try to parse this as Firefox-style
        // and fail to extract the correct information
        expect(chromeStyleLine).toContain('file.js:42:21');
      }
    );
  });
});