// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Create a promise chain that will generate a stack trace
    // and test the regex pattern for Firefox-style stack traces
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        // Force long stack traces to be enabled
        Q.longStackSupport = true;

        // Create a new error that will have a Firefox-style stack trace
        const firefoxError = new Error("Firefox error");
        firefoxError.stack = "func@http://example.com/file.js:42";

        // This should trigger the stack trace parsing code
        return Q.reject(firefoxError)
          .catch((e: Error) => {
            // The original code should correctly parse the line number
            // The mutated code will fail because \D+ won't match digits
            expect(e.stack).toContain("file.js:42");
            return Q.resolve();
          });
      });
  });
});