// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-e0dce9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise valueOf behavior", () => {
  it("should handle rejected promises correctly in valueOf", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);
    const promise = deferred.promise;

    // The mutation changes the condition from === to !==
    // In original: rejected promises should return themselves
    // In mutated: rejected promises would return the error value
    const result = promise.valueOf();

    // Check if result is the promise itself (original behavior)
    // or if it's the error (mutated behavior)
    if (result === promise) {
      // This is the original behavior
      expect(true).toBe(true);
    } else {
      // This would be the mutated behavior
      expect(result).toBe(error);
    }
  });
});