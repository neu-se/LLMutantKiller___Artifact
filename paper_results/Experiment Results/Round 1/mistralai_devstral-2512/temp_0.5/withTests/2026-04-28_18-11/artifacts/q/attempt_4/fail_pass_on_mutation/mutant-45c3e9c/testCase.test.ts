// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute tasks and allow promise resolution", (done) => {
    let taskExecuted = false;
    Q.nextTick(() => {
      taskExecuted = true;
    });

    const deferred = Q.defer();
    Q.nextTick(() => {
      deferred.resolve("resolved");
    });

    deferred.promise.then((value) => {
      expect(value).toBe("resolved");
      expect(taskExecuted).toBe(true);
      done();
    });
  });
});