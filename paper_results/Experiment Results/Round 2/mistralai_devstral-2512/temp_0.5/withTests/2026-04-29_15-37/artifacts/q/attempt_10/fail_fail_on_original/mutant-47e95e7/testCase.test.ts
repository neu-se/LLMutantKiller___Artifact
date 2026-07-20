// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior with rejected promises", () => {
  it("should return the promise itself for rejected state, not the error reason", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("test error");

    // Reject the promise
    deferred.reject(error);

    // Get valueOf result
    const valueOfResult = promise.valueOf();

    // Check that it returns the promise, not the error
    // This will fail on mutated version because it would return the error
    expect(valueOfResult).toBe(promise);

    // Additional check to ensure it's not the error
    expect(valueOfResult).not.toBe(error);
    expect(valueOfResult).not.toBeInstanceOf(Error);
  });
});