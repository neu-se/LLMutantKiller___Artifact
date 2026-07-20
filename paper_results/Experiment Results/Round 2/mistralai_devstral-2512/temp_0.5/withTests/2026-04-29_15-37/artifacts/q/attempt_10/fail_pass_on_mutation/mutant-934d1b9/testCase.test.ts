// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent multiple promise resolutions from being processed", () => {
    const deferred = Q.defer();
    const resolutionValues = [];

    deferred.promise.then((value) => {
      resolutionValues.push(value);
    });

    // First resolution
    deferred.resolve(1);

    // These should be ignored in original code
    deferred.resolve(2);
    deferred.resolve(3);

    // Force a synchronous check of the internal state
    const immediateState = deferred.promise.inspect();

    return Q.delay(10).then(() => {
      // Original code should only process first resolution
      expect(resolutionValues).toEqual([1]);
      expect(immediateState.state).toBe('fulfilled');
      expect(immediateState.value).toBe(1);

      // The mutation changes `if (resolvedPromise)` to `if (false)`
      // which would allow multiple resolutions to be processed
      // This test verifies the guard is working correctly
    });
  });
});