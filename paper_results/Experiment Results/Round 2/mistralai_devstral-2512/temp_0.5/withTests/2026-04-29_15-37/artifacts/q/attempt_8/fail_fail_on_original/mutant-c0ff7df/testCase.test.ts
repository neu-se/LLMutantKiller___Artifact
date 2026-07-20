// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should fail when dispatch operation is empty string", async () => {
    const testObject = { test: "value" };
    const promise = Q(testObject).get("test");
    await expect(promise).rejects.toThrow();
  });
});