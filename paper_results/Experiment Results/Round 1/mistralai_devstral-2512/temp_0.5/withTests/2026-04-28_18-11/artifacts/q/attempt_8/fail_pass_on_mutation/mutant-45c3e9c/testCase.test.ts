// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute tasks and handle promise rejection", (done) => {
    const deferred = Q.defer();
    let taskExecuted = false;

    Q.nextTick(() => {
      taskExecuted = true;
      deferred.reject(new Error("test error"));
    });

    deferred.promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error) => {
        expect(error.message).toBe("test error");
        expect(taskExecuted).toBe(true);
        done();
      }
    );
  });
});