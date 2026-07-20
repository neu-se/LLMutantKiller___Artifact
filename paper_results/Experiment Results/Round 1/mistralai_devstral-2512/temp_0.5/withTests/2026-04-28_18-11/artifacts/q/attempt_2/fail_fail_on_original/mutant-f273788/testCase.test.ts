// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f273788/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function", async () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    const result = await Q(testFn).fapply([1, 2, 3]);
    expect(result).toBe(6);
  });
});