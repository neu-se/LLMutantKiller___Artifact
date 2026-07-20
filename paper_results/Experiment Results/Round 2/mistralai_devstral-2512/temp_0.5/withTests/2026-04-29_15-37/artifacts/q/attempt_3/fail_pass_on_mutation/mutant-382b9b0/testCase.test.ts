// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-382b9b0/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("nodeify function", () => {
  it("should call the nodeback when provided", (done) => {
    const promise = Q(42);
    promise.nodeify((err: any, value: number) => {
      expect(err).toBeNull();
      expect(value).toBe(42);
      done();
    });
  });
});