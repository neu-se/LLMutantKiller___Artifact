// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with progress callback correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let progressValue: number | null = null;

    // Set up progress callback
    promise.done(null, null, (value: number) => {
      progressValue = value;
    });

    // Notify progress
    deferred.notify(42);

    // Verify the progress callback was called
    return Q.delay(10).then(() => {
      expect(progressValue).toBe(42);
    });
  });
});