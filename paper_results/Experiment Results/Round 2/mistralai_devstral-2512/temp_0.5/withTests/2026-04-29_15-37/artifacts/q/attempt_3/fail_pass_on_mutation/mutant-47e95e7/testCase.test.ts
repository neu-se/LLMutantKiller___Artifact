// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the promise itself when state is pending, but return the value when fulfilled", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Test pending state - should return the promise itself
    expect(promise.valueOf()).toBe(promise);

    // Test fulfilled state - should return the value
    deferred.resolve(42);
    expect(promise.valueOf()).toBe(42);
  });
});