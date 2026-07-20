// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-e4a515f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor", () => {
  it("should accept a function resolver", () => {
    const promise = new Q.Promise((resolve: any) => {
      resolve("success");
    });
    return promise.then((value: any) => {
      expect(value).toBe("success");
    });
  });
});