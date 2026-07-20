// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-93e48ca/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with null name", () => {
  it("should apply the function when name is null", () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    return Q(testFn)
      .post(null, [1, 2, 3])
      .then((result: number) => {
        expect(result).toBe(6);
      });
  });
});