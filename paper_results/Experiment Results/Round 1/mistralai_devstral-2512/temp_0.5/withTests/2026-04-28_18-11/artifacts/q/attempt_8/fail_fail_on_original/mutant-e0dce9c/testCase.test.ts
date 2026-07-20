// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-e0dce9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise valueOf behavior", () => {
  it("should return the promise itself for rejected promises", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);
    const promise = deferred.promise;

    // The mutation changes the condition from === to !==
    // In original: rejected promises return themselves
    // In mutated: rejected promises would return the error value
    const result = promise.valueOf();

    // This test verifies the original behavior
    expect(result).toBe(promise);
    // This would fail in mutated version where result would be the error
    expect(result).not.toBe(error);
  });
});