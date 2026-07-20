// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick execution order", () => {
  it("should execute tasks in correct order with proper async mechanism", (done) => {
    const executionOrder: string[] = [];
    const expectedOrder = ['task1', 'task2', 'task3'];

    Q.nextTick(() => {
      executionOrder.push('task1');
      Q.nextTick(() => {
        executionOrder.push('task2');
        Q.nextTick(() => {
          executionOrder.push('task3');
          expect(executionOrder).toEqual(expectedOrder);
          done();
        });
      });
    });
  });
});