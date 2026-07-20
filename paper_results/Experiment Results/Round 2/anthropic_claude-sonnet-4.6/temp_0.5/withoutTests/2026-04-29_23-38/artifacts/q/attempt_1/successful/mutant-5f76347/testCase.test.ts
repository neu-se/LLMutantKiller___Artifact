import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property using the specified key", async () => {
    const obj = { foo: "bar", baz: "qux" };
    await Q.delete(obj, "foo");
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.hasOwnProperty("baz")).toBe(true);
  });
});