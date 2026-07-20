// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a promise rejection with a stack trace that has single-digit column numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at Test.test (test.js:10:5)\n    at Object.<anonymous> (test.js:15:3)";

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
        expect(caughtError.stack).toContain("test.js:10:5");
      }
    );
  });
});