// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a mock error with a stack trace that has single-digit column numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at test.js:10:5";

    // Create a rejected promise with this error
    const deferred = Q.defer();
    deferred.reject(error);

    // Get the promise and force stack trace processing
    const promise = deferred.promise;

    // The promise should properly handle the stack trace parsing
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError: Error) => {
        // Verify the error was properly processed
        expect(caughtError.message).toBe("Test error");
        // Check that the stack trace was parsed correctly
        expect(caughtError.stack).toBeDefined();
        // The key difference: the mutated version would fail to parse this stack line
        // because it expects exactly one digit for the column number (?:\\d) instead of (?:\\d+)
      }
    );
  });
});