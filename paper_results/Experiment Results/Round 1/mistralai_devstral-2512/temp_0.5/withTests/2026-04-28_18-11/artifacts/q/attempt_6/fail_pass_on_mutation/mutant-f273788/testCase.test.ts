// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function with multiple arguments", async () => {
    const testFn = (a: number, b: number, c: number, d: number) => {
      return a + b + c + d;
    };
    const result = await Q(testFn).fapply([1, 2, 3, 4]);
    expect(result).toBe(10);
  });
});