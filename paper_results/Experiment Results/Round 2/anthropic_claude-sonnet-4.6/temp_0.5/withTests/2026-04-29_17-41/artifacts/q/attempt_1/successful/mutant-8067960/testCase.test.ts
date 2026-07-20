import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should get a property value from a promise for an object", async () => {
    const obj = { foo: 42 };
    const result = await Q.get(obj, "foo");
    expect(result).toBe(42);
  });
});