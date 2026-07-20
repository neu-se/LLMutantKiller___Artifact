// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent multiple promise resolutions", () => {
    const deferred = Q.defer();
    const resolutionOrder = [];

    deferred.promise.then((value) => {
      resolutionOrder.push(value);
    });

    // First resolution
    deferred.resolve(1);

    // Second resolution - should be ignored
    deferred.resolve(2);

    // Third resolution - should be ignored
    deferred.resolve(3);

    return Q.delay(20).then(() => {
      // In original code, only first resolution should be processed
      expect(resolutionOrder).toEqual([1]);
      expect(resolutionOrder.length).toBe(1);

      // Check promise state
      const inspection = deferred.promise.inspect();
      expect(inspection.state).toBe('fulfilled');
      expect(inspection.value).toBe(1);
    });
  });
});