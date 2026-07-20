// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with no callbacks correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the promise
    deferred.resolve("test value");

    // Call done with no callbacks - should not throw
    promise.done();

    // Verify the promise is still fulfilled
    return promise.then((value) => {
      expect(value).toBe("test value");
    });
  });
});