// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-45c3e9c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should execute multiple tasks in order", (done) => {
    const results: number[] = [];
    Q.nextTick(() => {
      results.push(1);
    });
    Q.nextTick(() => {
      results.push(2);
    });
    // In the original code, tasks should execute in order
    // In the mutated code (if (false)), tasks will never execute
    setTimeout(() => {
      expect(results).toEqual([1, 2]);
      done();
    }, 10);
  });
});