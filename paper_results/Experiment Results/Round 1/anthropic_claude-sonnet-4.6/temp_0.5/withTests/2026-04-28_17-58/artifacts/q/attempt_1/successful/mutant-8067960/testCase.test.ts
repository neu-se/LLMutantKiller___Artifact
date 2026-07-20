import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should return a promise that resolves to the property value of the object", async () => {
    const obj = { foo: 42 };
    const result = await Q.get(obj, "foo");
    expect(result).toBe(42);
  });
});