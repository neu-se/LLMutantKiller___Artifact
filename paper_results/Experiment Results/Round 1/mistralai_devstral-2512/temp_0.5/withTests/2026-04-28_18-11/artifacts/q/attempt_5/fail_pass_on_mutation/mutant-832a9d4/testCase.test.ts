// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick MessageChannel behavior", () => {
  it("should execute multiple tasks in order using MessageChannel when available", (done) => {
    const executionOrder: number[] = [];
    const expectedOrder = [1, 2, 3, 4, 5];

    // Schedule multiple tasks
    for (let i = 1; i <= 5; i++) {
      Q.nextTick(() => {
        executionOrder.push(i);
      });
    }

    // Check execution order after a delay
    setTimeout(() => {
      try {
        expect(executionOrder).toEqual(expectedOrder);
        done();
      } catch (error) {
        done(error);
      }
    }, 50);
  });
});