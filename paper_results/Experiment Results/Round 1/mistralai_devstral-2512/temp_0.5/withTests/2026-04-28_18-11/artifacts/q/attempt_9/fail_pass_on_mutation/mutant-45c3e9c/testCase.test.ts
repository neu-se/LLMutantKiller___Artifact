// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute multiple tasks and verify execution order", (done) => {
    const results: number[] = [];
    const deferred = Q.defer();

    Q.nextTick(() => {
      results.push(1);
      Q.nextTick(() => {
        results.push(3);
        deferred.resolve();
      });
    });

    Q.nextTick(() => {
      results.push(2);
    });

    deferred.promise.then(() => {
      expect(results).toEqual([1, 2, 3]);
      done();
    });
  });
});