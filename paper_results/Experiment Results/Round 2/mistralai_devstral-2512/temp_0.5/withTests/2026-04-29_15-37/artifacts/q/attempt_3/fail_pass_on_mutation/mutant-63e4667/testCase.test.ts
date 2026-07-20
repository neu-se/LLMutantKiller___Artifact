const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.keys behavior", () => {
  it("should return object's own enumerable property names without extra arguments", async () => {
    const obj = { a: 1, b: 2 };
    const keys = await Q(obj).keys();
    expect(keys).toHaveLength(2);
    expect(keys).not.toContain("Stryker was here");
  });
});