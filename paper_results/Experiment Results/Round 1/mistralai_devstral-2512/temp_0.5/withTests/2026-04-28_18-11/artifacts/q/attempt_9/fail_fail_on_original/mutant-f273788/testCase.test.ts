// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function with specific arguments", async () => {
    const testFn = (a: number, b: number, c: number) => {
      if (arguments.length !== 3) {
        throw new Error(`Expected 3 arguments but got ${arguments.length}`);
      }
      return a + b + c;
    };
    const result = await Q(testFn).fapply([1, 2, 3]);
    expect(result).toBe(6);
  });
});