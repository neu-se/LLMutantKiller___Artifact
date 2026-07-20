// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function with multiple arguments", async () => {
    const testFn = (a: number, b: number, c: number) => {
      if (a === 1 && b === 2 && c === 3) {
        return a + b + c;
      }
      throw new Error("Arguments not passed correctly");
    };
    const result = await Q(testFn).fapply([1, 2, 3]);
    expect(result).toBe(6);
  });
});