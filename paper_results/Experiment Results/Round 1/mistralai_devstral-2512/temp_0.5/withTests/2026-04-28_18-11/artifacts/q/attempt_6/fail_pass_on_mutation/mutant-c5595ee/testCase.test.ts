const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with @ symbol", () => {
    // Create a scenario that will test the getFileNameAndLineNumber function
    // by creating a stack trace that matches Firefox's format
    const error = new Error("Test error");

    // Simulate a Firefox-style stack trace with @ symbol
    error.stack = "Error: Test error\n" +
                  "functionName@http://example.com/file.js:42:21\n" +
                  "anotherFunction@http://example.com/other.js:10:5";

    // Enable long stack traces to trigger the parsing
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    return Q.delay(10)
      .then(() => {
        deferred.reject(error);
        return deferred.promise;
      })
      .catch((e: Error) => {
        // Verify the error was handled correctly
        // The original code should parse this correctly
        // The mutated code will fail to match the regex pattern
        expect(e.message).toBe("Test error");

        // Check that the stack trace was properly filtered
        // This will fail if the regex mutation prevents proper parsing
        expect(e.stack).toContain("functionName@http://example.com/file.js:42:21");
        return true;
      });
  });
});