import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get / Promise.prototype.get", () => {
  it("should retrieve a property from a fulfilled promise using the 'get' dispatch operation", async () => {
    const obj = { foo: "bar", baz: 42 };
    const promise = Q(obj);
    
    const result = await promise.get("foo");
    
    expect(result).toBe("bar");
  });
});