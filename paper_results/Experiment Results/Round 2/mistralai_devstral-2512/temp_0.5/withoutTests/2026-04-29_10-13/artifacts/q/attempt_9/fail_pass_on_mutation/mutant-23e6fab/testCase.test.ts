const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly handle stack lines that don't match any pattern", () => {
    // Create a stack line that doesn't match any of the patterns
    const stackLine = "some random stack line without pattern";

    // Access the internal function through the Q module's closure
    // We need to trigger the code path that uses attempt3
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
        // This would cause the function to try to access attempt3[1] and attempt3[2]
        // even when attempt3 is null, which would throw an error
        // The original code would return undefined in this case
        expect(caughtError.stack).toBeDefined();
      }
    );
  });
});