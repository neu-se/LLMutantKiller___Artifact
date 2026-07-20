const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should handle invalid Firefox-style stack traces gracefully", () => {
    // Create a stack line that partially matches attempt3 pattern but is invalid
    const stackLine = "function@invalid:not-a-number";

    // Create an error with this invalid stack line
    const error = new Error("test");
    error.stack = stackLine;

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create and reject a promise to trigger stack trace processing
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError: Error) => {
        // The mutation changes the condition from `if (attempt3)` to `if (true)`
        // This would cause the function to try to parse invalid stack lines
        // and potentially throw an error when Number(attempt3[2]) is called
        // on "not-a-number"
        expect(caughtError.stack).toBeDefined();
      }
    );
  });
});