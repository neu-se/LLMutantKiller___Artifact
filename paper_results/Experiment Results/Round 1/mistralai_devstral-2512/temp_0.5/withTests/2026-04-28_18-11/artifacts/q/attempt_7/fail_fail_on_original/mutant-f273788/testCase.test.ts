// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should correctly apply function with arguments array", async () => {
    const testFn = (a: number, b: number) => {
      if (arguments.length !== 2) {
        throw new Error(`Expected 2 arguments but got ${arguments.length}`);
      }
      return a + b;
    };
    const result = await Q(testFn).fapply([10, 20]);
    expect(result).toBe(30);
  });
});