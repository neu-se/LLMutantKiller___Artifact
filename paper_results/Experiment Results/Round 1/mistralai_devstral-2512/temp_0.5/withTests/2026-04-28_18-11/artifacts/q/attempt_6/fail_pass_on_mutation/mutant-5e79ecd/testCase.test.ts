// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with only rejected callback correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let rejectedCalled = false;

    // Set up only rejected callback
    promise.done(null, (error: Error) => {
      rejectedCalled = true;
      expect(error.message).toBe("test error");
    });

    // Reject the promise
    deferred.reject(new Error("test error"));

    // Verify the callback was called
    return Q.delay(10).then(() => {
      expect(rejectedCalled).toBe(true);
    });
  });
});