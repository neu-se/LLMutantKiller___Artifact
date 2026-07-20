// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function", async () => {
    const testFn = (a: number, b: number, c: number) => {
      if (a !== 1 || b !== 2 || c !== 3) {
        throw new Error(`Expected 1, 2, 3 but got ${a}, ${b}, ${c}`);
      }
      return a + b + c;
    };
    const result = await Q(testFn).fapply([1, 2, 3]);
    expect(result).toBe(6);
  });
});