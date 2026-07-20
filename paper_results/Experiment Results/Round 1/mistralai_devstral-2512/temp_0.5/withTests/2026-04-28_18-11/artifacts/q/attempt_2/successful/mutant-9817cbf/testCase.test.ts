// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-9817cbf/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with an Error when all promises are rejected", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    deferred1.reject(new Error("First error"));
    deferred2.reject(new Error("Second error"));

    return Q.any(promises).then(
      () => {
        throw new Error("Expected promise to be rejected");
      },
      (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Q can't get fulfillment value from any promise");
      }
    );
  });
});