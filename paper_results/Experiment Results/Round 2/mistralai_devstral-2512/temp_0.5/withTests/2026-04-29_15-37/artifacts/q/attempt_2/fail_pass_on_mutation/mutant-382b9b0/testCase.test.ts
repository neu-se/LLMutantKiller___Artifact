// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-382b9b0/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("nodeify function", () => {
  it("should return a promise when called without a nodeback", () => {
    const promise = Q(42);
    const result = promise.nodeify();
    expect(result).toBeInstanceOf(Object);
    return result.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});