import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete / Promise.prototype.delete", () => {
  it("should delete a property from an object using Promise.prototype.delete", async () => {
    const obj = { foo: 42, bar: "hello" };
    const promise = Q(obj);
    
    // The original code defines Promise.prototype["delete"] = function(key) { ... }
    // The mutated code defines Promise.prototype[""] = function(key) { ... }
    // So in the mutated code, promise["delete"] would be undefined
    
    expect(typeof promise["delete"]).toBe("function");
    
    await promise["delete"]("foo");
    
    expect(obj.foo).toBeUndefined();
    expect(obj.bar).toBe("hello");
  });
});