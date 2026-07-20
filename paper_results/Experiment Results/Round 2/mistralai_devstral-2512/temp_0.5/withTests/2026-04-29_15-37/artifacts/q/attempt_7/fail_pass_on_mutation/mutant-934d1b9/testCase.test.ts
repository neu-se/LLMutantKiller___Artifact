// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent state changes after resolution", () => {
    const deferred = Q.defer();
    let callbackCount = 0;

    deferred.promise.then(() => {
      callbackCount++;
    });

    // First resolution
    deferred.resolve(10);

    // Attempt to resolve again - should be ignored
    deferred.resolve(20);

    // Attempt to reject - should also be ignored
    deferred.reject(new Error("test"));

    return Q.delay(10).then(() => {
      // Original code should only call callback once
      expect(callbackCount).toBe(1);

      // Check that promise state is correct
      const inspection = deferred.promise.inspect();
      expect(inspection.state).toBe('fulfilled');
      expect(inspection.value).toBe(10);

      // Verify no rejection occurred
      expect(inspection.state).not.toBe('rejected');
    });
  });
});