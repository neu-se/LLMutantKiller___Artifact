import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should retrieve a property value from a resolved object", async () => {
    const obj = { foo: "bar" };
    const result = await Q.get(obj, "foo");
    expect(result).toBe("bar");
  });
});