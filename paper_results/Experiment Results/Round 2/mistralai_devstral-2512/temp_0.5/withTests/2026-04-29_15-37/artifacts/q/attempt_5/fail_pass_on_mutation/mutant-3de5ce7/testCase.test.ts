// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Enable long stack traces to trigger the parsing code
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        // Create a mock error with Firefox-style stack trace
        const firefoxError = new Error("Firefox error");
        firefoxError.stack = "func@http://example.com/file.js:42\nFrom previous event:\nfunc2@http://example.com/file2.js:100";

        // This should trigger the stack trace parsing code
        return Q.reject(firefoxError)
          .catch((e: Error) => {
            // The original code should correctly parse the line number
            // The mutated code will fail because \D+ won't match digits in "file.js:42"
            expect(e.stack).toContain("file.js:42");
            return Q.resolve();
          });
      });
  });
});