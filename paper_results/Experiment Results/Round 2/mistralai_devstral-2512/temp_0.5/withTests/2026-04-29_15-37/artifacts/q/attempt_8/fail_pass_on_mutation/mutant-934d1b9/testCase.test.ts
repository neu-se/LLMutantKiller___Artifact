// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should enforce single resolution of deferred promises", () => {
    const deferred = Q.defer();
    const results = [];

    // Create multiple observers
    for (let i = 0; i < 3; i++) {
      deferred.promise.then((value) => {
        results.push(value);
      });
    }

    // First resolution
    deferred.resolve(10);

    // These should be ignored in original code
    deferred.resolve(20);
    deferred.resolve(30);

    return Q.delay(10).then(() => {
      // All observers should receive the first value only
      expect(results).toEqual([10, 10, 10]);
      expect(results.length).toBe(3);

      // Verify promise state
      const inspection = deferred.promise.inspect();
      expect(inspection.state).toBe('fulfilled');
      expect(inspection.value).toBe(10);
    });
  });
});