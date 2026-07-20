// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d65a538/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace filtering", () => {
  it("should handle errors without stack traces gracefully", () => {
    // This test targets the mutation in the captureLine function
    // The mutation changes `return;` to an empty block `{}`
    // We need to test behavior when stack traces are not available

    // Create a promise that will be rejected
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Remove the stack trace to simulate an environment without stack traces
    delete error.stack;

    // Reject the promise with the error
    deferred.reject(error);

    // The test passes if the promise is properly rejected
    // The mutation would cause different behavior in stack trace handling
    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (rejectedError) => {
        expect(rejectedError).toBe(error);
      }
    );
  });
});