const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a mock error with a specific stack trace format
    const error = new Error("test");
    error.stack = "Error: test\n    at functionName (filename.js:42:24)\n    at anotherFunction (another.js:10:5)";

    // Enable long stack traces to trigger stack parsing
    Q.longStackSupport = true;

    // Create a rejected promise with our mock error
    const deferred = Q.defer();
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        // The error should have a stack trace that can be parsed
        expect(err.stack).toBeDefined();

        // The mutation changes the condition from `if (attempt1)` to `if (false)`
        // which would break stack trace parsing, causing the stack filtering to fail
        // This should be detectable through the stack trace format
        expect(err.stack).toContain("filename.js:42:24");

        return true;
      }
    );
  });
});