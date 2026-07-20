// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute deferred tasks and resolve promises", (done) => {
    const deferred = Q.defer();
    let taskExecuted = false;

    Q.nextTick(() => {
      taskExecuted = true;
      deferred.resolve("success");
    });

    deferred.promise.then((result) => {
      expect(result).toBe("success");
      expect(taskExecuted).toBe(true);
      done();
    });
  });
});