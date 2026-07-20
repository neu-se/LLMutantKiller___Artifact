// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-d65a538/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace handling", () => {
  it("should properly handle errors without stack traces", () => {
    // This test targets the mutation in the captureLine function
    // The mutation changes `return;` to an empty block `{}`
    // We need to test behavior when stack traces are not available

    // Create an error without a stack trace
    const error = new Error("Test error");
    delete error.stack;

    // Create a promise that will be rejected with the error
    const deferred = Q.defer();
    deferred.reject(error);

    // The test verifies that the promise is properly rejected
    // even when stack traces are not available
    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (rejectedError: Error) => {
        expect(rejectedError).toBe(error);
        expect(rejectedError.stack).toBeUndefined();
      }
    );
  });
});