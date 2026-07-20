import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should set a property on an object using the key and value arguments", async () => {
    const obj = { foo: "original" };
    await Q.set(obj, "foo", "updated");
    expect(obj.foo).toBe("updated");
  });
});