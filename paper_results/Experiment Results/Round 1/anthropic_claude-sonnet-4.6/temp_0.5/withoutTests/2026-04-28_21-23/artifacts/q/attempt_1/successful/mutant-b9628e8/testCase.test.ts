import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from an object using the delete dispatch operation", async () => {
    const obj = { foo: "bar", baz: "qux" };
    
    // Use Q.del (which calls dispatch("delete", [key])) to delete a property
    await Q(obj).del("foo");
    
    // After deletion, the property should no longer exist on the object
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.baz).toBe("qux");
  });
});