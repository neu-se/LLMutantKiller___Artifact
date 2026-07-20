const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved value", async () => {
    const obj = { foo: "bar" };
    const promise = Q(obj);
    await promise.set("foo", "baz");
    expect(obj.foo).toBe("baz");
  });
});