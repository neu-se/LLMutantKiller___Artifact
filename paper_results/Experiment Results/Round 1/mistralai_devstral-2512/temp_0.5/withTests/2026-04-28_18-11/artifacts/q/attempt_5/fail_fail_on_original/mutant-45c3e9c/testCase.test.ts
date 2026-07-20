// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute tasks and handle errors", (done) => {
    const error = new Error("test error");
    let errorCaught = false;

    Q.nextTick(() => {
      throw error;
    });

    Q.onerror = (e) => {
      errorCaught = true;
      expect(e).toBe(error);
      done();
    };

    setTimeout(() => {
      if (!errorCaught) {
        throw new Error("Error was not caught");
      }
    }, 10);
  });
});