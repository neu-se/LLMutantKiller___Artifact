import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from an object using the delete dispatch", async () => {
    const obj = { foo: "bar", baz: "qux" };
    
    // Use Q.del (which internally calls Promise.prototype["delete"])
    await Q.del(Q(obj), "foo");
    
    // After deletion, the property should no longer exist
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.baz).toBe("qux");
  });
});