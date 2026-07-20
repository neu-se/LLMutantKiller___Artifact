// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute tasks asynchronously", (done) => {
    let executed = false;
    Q.nextTick(() => {
      executed = true;
    });
    // In the original code, the task should execute in a future turn
    // In the mutated code (if (false)), the task will never execute
    setTimeout(() => {
      expect(executed).toBe(true);
      done();
    }, 10);
  });
});