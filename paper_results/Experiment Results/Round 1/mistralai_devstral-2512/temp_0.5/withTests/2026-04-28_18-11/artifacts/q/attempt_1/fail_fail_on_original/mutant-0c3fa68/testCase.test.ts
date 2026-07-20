// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0c3fa68/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.progress", () => {
  it("should call the progress listener when notified", () => {
    let progressCalled = false;
    const deferred = Q.defer();
    const promise = Q.progress(deferred.promise, () => {
      progressCalled = true;
    });
    deferred.notify();
    deferred.resolve();
    return promise.then(() => {
      expect(progressCalled).toBe(true);
    });
  });
});