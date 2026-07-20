// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-f273788/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function with specific context", async () => {
    const context = { value: 42 };
    const testFn = function(this: typeof context, a: number, b: number) {
      return this.value + a + b;
    };
    const result = await Q(testFn).fapply([1, 2]);
    expect(result).toBe(45);
  });
});