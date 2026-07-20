import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should actually delete the property from the underlying object", async () => {
    const obj: { foo?: string; bar: string } = { foo: "value", bar: "keep" };
    
    // Call the delete method directly on a promise wrapping obj
    const promise = Q(obj);
    await promise["delete"]("foo");
    
    // The property should have been deleted from the object
    expect("foo" in obj).toBe(false);
    expect(obj.bar).toBe("keep");
  });
});