// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-934d1b9/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer behavior", () => {
  it("should prevent multiple resolutions when resolvedPromise check is bypassed", () => {
    const deferred = Q.defer();
    let firstResolveValue = null;
    let secondResolveValue = null;

    deferred.promise.then((value) => {
      if (firstResolveValue === null) {
        firstResolveValue = value;
      } else {
        secondResolveValue = value;
      }
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution - should be ignored in original code
    deferred.resolve(20);

    return Q.delay(10).then(() => {
      // In original code, second resolution should be ignored
      // In mutated code (if (false)), both resolutions might go through
      expect(firstResolveValue).toBe(10);
      expect(secondResolveValue).toBe(null);
    });
  });
});