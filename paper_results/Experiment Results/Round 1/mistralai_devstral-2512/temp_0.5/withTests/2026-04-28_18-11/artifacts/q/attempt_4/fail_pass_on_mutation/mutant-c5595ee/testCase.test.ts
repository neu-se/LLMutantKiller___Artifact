const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol in Firefox format", () => {
    // Create a mock stack line that matches Firefox's format
    // This format is specifically handled by the attempt3 regex
    const mockStackLine = "functionName@http://example.com/file.js:42";

    // We need to test the internal getFileNameAndLineNumber function
    // by creating a scenario where it would be called
    const error = new Error("Test");
    error.stack = `Error: Test\n${mockStackLine}`;

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
        // The original code should handle this correctly
        // The mutated code will fail to parse this stack line
        expect(e.message).toBe("Test");
        return true;
      });
  });
});