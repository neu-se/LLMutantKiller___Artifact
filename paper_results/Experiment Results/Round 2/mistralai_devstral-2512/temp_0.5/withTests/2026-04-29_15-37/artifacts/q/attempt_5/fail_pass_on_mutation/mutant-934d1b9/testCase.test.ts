// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent state changes after first resolution", () => {
    const deferred = Q.defer();
    const results = [];

    deferred.promise.then(
      (value) => results.push({ type: 'fulfilled', value }),
      (reason) => results.push({ type: 'rejected', reason })
    );

    // First resolution
    deferred.resolve(10);

    // These should be ignored in original code
    deferred.resolve(20);
    deferred.reject(new Error("test"));

    return Q.delay(10).then(() => {
      // Original code should only have one fulfillment
      expect(results).toEqual([{ type: 'fulfilled', value: 10 }]);

      // Mutated code might allow multiple resolutions
      expect(results.length).toBe(1);
      expect(deferred.promise.inspect().state).toBe('fulfilled');
      expect(deferred.promise.inspect().value).toBe(10);
    });
  });
});