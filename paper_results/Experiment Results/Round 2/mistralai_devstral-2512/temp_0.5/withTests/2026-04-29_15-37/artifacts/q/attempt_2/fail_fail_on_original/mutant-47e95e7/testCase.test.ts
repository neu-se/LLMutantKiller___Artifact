// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the promise itself when state is pending or rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Test pending state
    expect(promise.valueOf()).toBe(promise);

    // Test rejected state
    deferred.reject(new Error("test error"));
    expect(promise.valueOf()).toBe(promise);
  });
});