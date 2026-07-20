// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior with rejected state", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // First reject the promise
    deferred.reject(new Error("test error"));

    // For rejected promises, valueOf should return the promise itself
    const valueOfResult = promise.valueOf();

    // The key assertion: for rejected promises, valueOf should return the promise
    expect(valueOfResult).toBe(promise);
    expect(valueOfResult).not.toBeInstanceOf(Error);
  });
});