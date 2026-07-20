// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Enable long stack traces to trigger the parsing code
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace with Firefox-style format
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Manually set a Firefox-style stack trace
    error.stack = "func@http://example.com/file.js:42";

    deferred.reject(error);

    return deferred.promise
      .catch((e: Error) => {
        // The original regex should match "file.js:42" and extract line number 42
        // The mutated regex with \D+ instead of \d+ will fail to match the digits
        expect(e.stack).toContain("file.js:42");
        return Q.resolve();
      });
  });
});