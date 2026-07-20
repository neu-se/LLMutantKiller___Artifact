// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf7f5f9/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.onerror behavior", () => {
  it("should call Q.onerror when an error is thrown in a progress handler", (done) => {
    const testError = new Error("test error");
    let onerrorCalled = false;

    Q.onerror = (error: Error) => {
      onerrorCalled = true;
      expect(error).toBe(testError);
      done();
    };

    const deferred = Q.defer();
    deferred.promise.progress(() => {
      throw testError;
    });

    deferred.notify();
  });
});