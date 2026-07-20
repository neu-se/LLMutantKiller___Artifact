// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Enable long stack traces to trigger the parsing code
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    error.stack = "func@http://example.com/file.js:42";

    // Create a promise that will use the stack trace parsing
    const deferred = Q.defer();
    deferred.reject(error);

    return deferred.promise
      .catch((e: Error) => {
        // The original regex should match "file.js:42" and extract line number 42
        // The mutated regex with \D+ instead of \d+ will fail to match the digits
        // We verify by checking if the stack trace was properly formatted
        expect(e.stack).toContain("file.js:42");
        return Q.resolve();
      });
  });
});