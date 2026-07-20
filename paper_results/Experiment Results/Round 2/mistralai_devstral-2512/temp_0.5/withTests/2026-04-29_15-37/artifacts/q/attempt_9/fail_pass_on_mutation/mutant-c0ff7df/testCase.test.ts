// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should correctly dispatch 'get' operation and retrieve property value", async () => {
    const testObject = { key: "expectedValue" };
    const result = await Q(testObject).get("key");
    expect(result).toBe("expectedValue");
  });
});