import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on an object via a promise", async () => {
    const obj: { [key: string]: any } = { foo: "original" };
    const promise = Q(obj);
    
    await promise.set("foo", "updated");
    
    expect(obj.foo).toBe("updated");
  });
});