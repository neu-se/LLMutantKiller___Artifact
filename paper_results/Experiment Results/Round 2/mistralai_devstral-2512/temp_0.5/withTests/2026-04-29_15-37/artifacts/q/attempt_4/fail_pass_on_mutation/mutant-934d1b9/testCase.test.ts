// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should properly handle deferred resolution state", () => {
    const deferred = Q.defer();
    let resolutionCount = 0;

    deferred.promise.then(() => {
      resolutionCount++;
    });

    // First resolution
    deferred.resolve(10);

    // Attempt second resolution - should be ignored in original code
    deferred.resolve(20);

    // Attempt rejection - should also be ignored in original code
    deferred.reject(new Error("Should be ignored"));

    return Q.delay(10).then(() => {
      expect(resolutionCount).toBe(1);
      expect(deferred.promise.isFulfilled()).toBe(true);
      expect(deferred.promise.isRejected()).toBe(false);
    });
  });
});