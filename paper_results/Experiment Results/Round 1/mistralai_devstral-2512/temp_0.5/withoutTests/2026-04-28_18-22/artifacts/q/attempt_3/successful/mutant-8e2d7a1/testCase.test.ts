const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved value", async () => {
    const obj = { foo: "bar" };
    const promise = Q(obj);
    const result = await promise.set("baz", "qux");
    expect(result).toBeUndefined();
    expect((obj as any).baz).toBe("qux");
  });
});