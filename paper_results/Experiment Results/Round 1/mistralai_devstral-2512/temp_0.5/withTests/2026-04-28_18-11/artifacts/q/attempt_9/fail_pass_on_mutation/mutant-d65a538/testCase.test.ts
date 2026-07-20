// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-d65a538/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace handling", () => {
  it("should properly handle stack traces when available", () => {
    // This test targets the mutation in the captureLine function
    // The mutation changes `return;` to an empty block `{}`
    // We need to test behavior when stack traces are available

    // Create a promise that will be rejected with a proper stack trace
    const deferred = Q.defer();
    const error = new Error("Test error with stack");

    // Reject the promise with the error
    deferred.reject(error);

    // The test verifies that the promise is properly rejected
    // and that stack trace handling works correctly
    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (rejectedError: Error) => {
        expect(rejectedError).toBe(error);
        expect(rejectedError.stack).toBeDefined();
        // The key assertion: stack trace should be filtered
        // In the mutated version, this might behave differently
        if (rejectedError.stack) {
          expect(rejectedError.stack).not.toContain("q.js");
        }
      }
    );
  });
});