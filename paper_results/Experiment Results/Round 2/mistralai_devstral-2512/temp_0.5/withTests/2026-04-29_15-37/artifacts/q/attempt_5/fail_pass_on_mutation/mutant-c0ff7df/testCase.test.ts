// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should correctly retrieve property value using get operation", async () => {
    const testObject = { foo: "bar" };
    const result = await Q(testObject).get("foo");
    expect(result).toBe("bar");
  });
});