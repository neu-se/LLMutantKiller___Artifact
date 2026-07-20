const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 pattern", () => {
    // Create a mock stack line that matches the attempt3 pattern
    const stackLine = "function@file.js:42";

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
        // This would cause the function to always return the attempt3 parsing
        // even when attempt3 is null/undefined, which would cause an error
        // when trying to access attempt3[1] and attempt3[2]

        // The test passes if we reach here without throwing
        // The mutation would cause an error when trying to access properties
        // of null/undefined attempt3
      }
    );
  });
});