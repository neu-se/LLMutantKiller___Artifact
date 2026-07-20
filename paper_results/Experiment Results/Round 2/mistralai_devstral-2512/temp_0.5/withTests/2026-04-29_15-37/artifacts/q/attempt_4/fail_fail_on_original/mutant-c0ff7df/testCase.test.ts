// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should fail when dispatch is called with empty operation string", async () => {
    const obj = { a: 1 };
    const promise = Q(obj).get("a");
    await expect(promise).rejects.toBeDefined();
  });
});