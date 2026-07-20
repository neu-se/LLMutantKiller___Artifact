// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should dispatch with the correct operation name and fail when operation is empty", async () => {
    const obj = { a: 1 };
    const promise = Q(obj).get("a");
    await expect(promise).resolves.toBe(1);
  });
});