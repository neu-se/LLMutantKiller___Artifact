import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get / Promise.prototype.get", () => {
  it("should retrieve a property value from a fulfilled promise using get()", async () => {
    const obj = { foo: "bar", count: 42 };
    const promise = Q(obj);
    
    const result = await promise.get("foo");
    
    expect(result).toBe("bar");
  });
});