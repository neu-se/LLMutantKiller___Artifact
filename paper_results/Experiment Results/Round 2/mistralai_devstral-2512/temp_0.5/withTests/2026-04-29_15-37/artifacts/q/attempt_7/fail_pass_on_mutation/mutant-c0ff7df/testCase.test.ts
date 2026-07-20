// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should correctly dispatch 'get' operation to retrieve property value", async () => {
    const testObject = { prop: "value" };
    const promise = Q(testObject).get("prop");
    await expect(promise).resolves.toBe("value");
  });
});