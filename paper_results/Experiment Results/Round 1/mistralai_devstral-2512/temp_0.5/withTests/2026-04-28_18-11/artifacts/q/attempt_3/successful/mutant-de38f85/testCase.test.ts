// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-de38f85/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.keys", () => {
  it("should fulfill with the object's own enumerable property names", async () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj).keys();
    await expect(promise).resolves.toEqual(["a", "b"]);
  });
});