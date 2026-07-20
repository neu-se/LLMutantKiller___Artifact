// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-8dffd9e/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending behavior", () => {
  it("should correctly identify pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should be pending initially
    expect(Q.isPending(promise)).toBe(true);
    expect(promise.isPending()).toBe(true);

    // Resolve the promise
    deferred.resolve(42);

    // After resolution, the promise should no longer be pending
    return promise.then(() => {
      expect(Q.isPending(promise)).toBe(false);
      expect(promise.isPending()).toBe(false);
    });
  });
});