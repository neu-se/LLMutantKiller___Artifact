import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object using the specified key", async () => {
    const obj = { foo: 1, bar: 2 };
    await Q.delete(obj, "foo");
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.bar).toBe(2);
  });
});