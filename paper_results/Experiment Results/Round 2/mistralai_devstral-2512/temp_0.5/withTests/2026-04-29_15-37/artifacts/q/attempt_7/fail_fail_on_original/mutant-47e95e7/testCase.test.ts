// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior with rejected promises", () => {
  it("should return the promise itself for rejected promises, not the reason value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("test error");

    // Reject the promise
    deferred.reject(error);

    // For rejected promises, valueOf should return the promise itself
    const valueOfResult = promise.valueOf();

    // The key assertion: rejected promises should return themselves
    expect(valueOfResult).toBe(promise);

    // Additional check: it should NOT return the error object
    expect(valueOfResult).not.toBe(error);
    expect(valueOfResult).not.toBeInstanceOf(Error);
  });
});