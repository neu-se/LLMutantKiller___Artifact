// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-a42b6c6/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makeNodeResolver", () => {
  it("should reject the promise when an error is provided", (done) => {
    const deferred = Q.defer();
    const nodeResolver = deferred.makeNodeResolver();

    // Call the node resolver with an error
    const testError = new Error("Test error");
    nodeResolver(testError);

    // The promise should be rejected with the provided error
    deferred.promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error: Error) => {
        expect(error).toBe(testError);
        done();
      }
    );
  });
});