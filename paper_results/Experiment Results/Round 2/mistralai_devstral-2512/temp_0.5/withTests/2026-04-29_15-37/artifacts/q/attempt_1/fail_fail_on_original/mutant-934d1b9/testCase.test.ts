// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer behavior", () => {
  it("should allow multiple resolutions to be ignored after first resolution", () => {
    const deferred = Q.defer();
    let resolveCount = 0;

    deferred.promise.then(() => {
      resolveCount++;
    });

    // First resolution should work
    deferred.resolve(10);

    // Second resolution should be ignored
    deferred.resolve(20);

    return Q.delay(10).then(() => {
      expect(resolveCount).toBe(1);
    });
  });
});