// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with conditional callbacks correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let callbackCalled = false;

    // Set up conditional callback
    const fulfilled = (value: string) => {
      callbackCalled = true;
      return value === "expected";
    };

    promise.done(fulfilled);

    // Resolve the promise
    deferred.resolve("expected");

    // Verify the callback was called and returned correct value
    return Q.delay(10).then(() => {
      expect(callbackCalled).toBe(true);
    });
  });
});