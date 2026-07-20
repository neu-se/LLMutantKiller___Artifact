// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-e0dce9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise valueOf behavior", () => {
  it("should return the promise itself when rejected", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);
    const promise = deferred.promise;
    // The mutation changes the condition from === to !==
    // In the original code, rejected promises should return themselves
    // In the mutated code, they would incorrectly return the value
    expect(promise.valueOf()).toBe(promise);
    expect(promise.valueOf()).not.toBe(error);
  });
});