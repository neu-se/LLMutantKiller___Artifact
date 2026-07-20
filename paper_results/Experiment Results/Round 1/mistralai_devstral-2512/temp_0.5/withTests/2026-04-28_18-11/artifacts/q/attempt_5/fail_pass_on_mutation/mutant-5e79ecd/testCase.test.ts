// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with fulfilled and rejected callbacks correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let fulfilledCalled = false;
    let rejectedCalled = false;

    // Set up both fulfilled and rejected callbacks
    promise.done(
      (value: string) => {
        fulfilledCalled = true;
        expect(value).toBe("test value");
      },
      (error: Error) => {
        rejectedCalled = true;
        expect(false).toBe(true); // Should not be called
      }
    );

    // Resolve the promise
    deferred.resolve("test value");

    // Verify the correct callback was called
    return Q.delay(10).then(() => {
      expect(fulfilledCalled).toBe(true);
      expect(rejectedCalled).toBe(false);
    });
  });
});