// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-47e95e7/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should handle rejected promises correctly in valueOf", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("test error");

    // Reject the promise
    deferred.reject(error);

    // Get the valueOf result
    const valueOfResult = promise.valueOf();

    // Check the inspect state
    const inspection = promise.inspect();
    expect(inspection.state).toBe("rejected");
    expect(inspection.reason).toBe(error);

    // The key test: valueOf should return the promise for rejected state
    // This will fail on the mutated version because the condition becomes 'false'
    if (inspection.state === "rejected") {
      expect(valueOfResult).toBe(promise);
    } else {
      expect(valueOfResult).toBe(inspection.value);
    }
  });
});