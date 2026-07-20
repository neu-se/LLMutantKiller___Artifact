// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute tasks and allow promise chaining", (done) => {
    let executionOrder: string[] = [];

    Q.nextTick(() => {
      executionOrder.push("task1");
    });

    Q.nextTick(() => {
      executionOrder.push("task2");
    });

    Q.delay(5).then(() => {
      executionOrder.push("delayed");
      expect(executionOrder).toEqual(["task1", "task2", "delayed"]);
      done();
    });
  });
});