// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks asynchronously", (done) => {
    const Q = qModule.default || qModule;

    let executionOrder: string[] = [];
    executionOrder.push("before");

    Q.nextTick(() => {
      executionOrder.push("tick");
      expect(executionOrder).toEqual(["before", "after", "tick"]);
      done();
    });

    executionOrder.push("after");
  });
});