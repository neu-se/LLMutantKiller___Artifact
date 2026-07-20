// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior with rejected promises", () => {
  it("should return the promise for rejected state, not the reason", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("test error");

    // Reject the promise
    deferred.reject(error);

    // Get valueOf result
    const valueOfResult = promise.valueOf();

    // Check inspect state
    const inspection = promise.inspect();
    expect(inspection.state).toBe("rejected");

    // The mutation changes this condition from "rejected" to "false"
    // So in mutated version, it would return inspection.value (the error)
    // In original version, it should return the promise
    expect(typeof valueOfResult).toBe('object');
    expect(valueOfResult).toHaveProperty('then');
    expect(valueOfResult).toHaveProperty('inspect');
  });
});