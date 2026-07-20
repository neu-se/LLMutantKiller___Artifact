import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete / Promise.prototype.delete", () => {
  it("should delete a property from an object using Promise.prototype.delete", async () => {
    const obj = { foo: "bar", baz: "qux" };
    const promise = Q(obj);
    
    // The original code defines Promise.prototype["delete"]
    // The mutated code defines Promise.prototype[""] instead
    // So calling .delete() should work in original but fail/not exist in mutated
    
    expect(typeof promise["delete"]).toBe("function");
    
    await promise["delete"]("foo");
    
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.baz).toBe("qux");
  });
});