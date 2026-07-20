// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-e0dce9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise valueOf behavior", () => {
  it("should return the promise itself for rejected promises", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);
    const promise = deferred.promise;

    const result = promise.valueOf();

    // In original code: rejected promises return themselves
    // In mutated code: rejected promises would return the error
    // So we verify that result is the promise, not the error
    expect(result).toBe(promise);
    expect(result).not.toBe(error);
  });
});