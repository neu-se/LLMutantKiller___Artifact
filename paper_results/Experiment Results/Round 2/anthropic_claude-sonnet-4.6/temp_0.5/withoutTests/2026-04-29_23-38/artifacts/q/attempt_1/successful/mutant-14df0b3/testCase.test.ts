import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object and return a promise", async () => {
    const obj = { foo: "bar", baz: "qux" };
    const result = await Q["delete"](obj, "foo");
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.baz).toBe("qux");
  });
});