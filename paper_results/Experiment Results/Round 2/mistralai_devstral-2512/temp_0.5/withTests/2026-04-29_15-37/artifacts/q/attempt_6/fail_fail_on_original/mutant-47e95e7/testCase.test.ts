// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior with inspect", () => {
  it("should return the promise when state is rejected according to inspect", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise
    deferred.reject(new Error("test error"));

    // Check the inspect state
    const inspection = promise.inspect();
    expect(inspection.state).toBe("rejected");

    // For rejected promises, valueOf should return the promise itself
    const valueOfResult = promise.valueOf();
    expect(valueOfResult).toBe(promise);
  });
});