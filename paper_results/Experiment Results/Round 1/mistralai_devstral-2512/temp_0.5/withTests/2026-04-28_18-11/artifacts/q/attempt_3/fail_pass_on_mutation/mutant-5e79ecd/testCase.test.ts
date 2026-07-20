// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with callbacks correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let callbackCalled = false;

    // Set up a callback that will be called when the promise is fulfilled
    promise.done((value: string) => {
      callbackCalled = true;
      expect(value).toBe("test value");
    });

    // Resolve the promise
    deferred.resolve("test value");

    // Verify the callback was called
    return Q.delay(10).then(() => {
      expect(callbackCalled).toBe(true);
    });
  });
});