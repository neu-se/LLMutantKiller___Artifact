const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.keys behavior", () => {
  it("should return object's own enumerable property names", async () => {
    const obj = { a: 1, b: 2 };
    const keys = await Q(obj).keys();
    expect(keys.sort()).toEqual(["a", "b"]);
  });
});