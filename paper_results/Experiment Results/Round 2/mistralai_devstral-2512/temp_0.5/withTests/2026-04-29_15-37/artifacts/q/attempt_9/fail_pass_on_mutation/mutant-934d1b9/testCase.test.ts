// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent multiple resolutions from affecting promise state", () => {
    const deferred = Q.defer();
    let firstValue = null;
    let secondValue = null;

    deferred.promise.then((value) => {
      if (firstValue === null) {
        firstValue = value;
      } else {
        secondValue = value;
      }
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution - should be ignored
    deferred.resolve(20);

    return Q.delay(10).then(() => {
      // In original code, only first resolution should be processed
      expect(firstValue).toBe(10);
      expect(secondValue).toBe(null);

      // Verify the internal state
      const inspection = deferred.promise.inspect();
      expect(inspection.state).toBe('fulfilled');
      expect(inspection.value).toBe(10);

      // The mutation changes the condition from `if (resolvedPromise)` to `if (false)`
      // which would allow multiple resolutions to go through
      // This test verifies that only one resolution is processed
    });
  });
});