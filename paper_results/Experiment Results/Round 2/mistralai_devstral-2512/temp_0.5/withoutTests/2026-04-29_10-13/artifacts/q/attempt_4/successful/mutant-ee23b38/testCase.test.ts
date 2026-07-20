const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved object", async () => {
    const obj = {};
    const promise = Q(obj);
    await promise.set("test", "value");
    expect(obj.test).toBe("value");
  });
});