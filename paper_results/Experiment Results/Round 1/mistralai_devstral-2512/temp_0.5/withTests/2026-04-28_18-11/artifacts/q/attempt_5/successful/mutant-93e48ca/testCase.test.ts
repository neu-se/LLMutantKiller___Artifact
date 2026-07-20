// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-93e48ca/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with method name", () => {
  it("should call the method when name is provided", () => {
    const obj = {
      method: function(a: number, b: number) {
        return a + b;
      }
    };
    return Q(obj)
      .post("method", [2, 3])
      .then((result: number) => {
        expect(result).toBe(5);
      });
  });
});