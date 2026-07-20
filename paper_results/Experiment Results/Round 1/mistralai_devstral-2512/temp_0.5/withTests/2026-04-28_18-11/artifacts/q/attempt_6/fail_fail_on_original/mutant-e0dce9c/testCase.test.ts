// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-e0dce9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise valueOf behavior", () => {
  it("should return the promise itself when rejected", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);
    const promise = deferred.promise;
    // The mutation changes the condition from === to !== in the valueOf method
    // In the original code, rejected promises should return themselves
    // In the mutated code, they would incorrectly try to return the value
    // We need to check the actual behavior of valueOf for rejected promises
    const result = promise.valueOf();
    expect(result).toBe(promise);
    // Also verify it's not returning the error object
    expect(result).not.toBe(error);
    // And verify it's not returning undefined
    expect(result).not.toBeUndefined();
  });
});