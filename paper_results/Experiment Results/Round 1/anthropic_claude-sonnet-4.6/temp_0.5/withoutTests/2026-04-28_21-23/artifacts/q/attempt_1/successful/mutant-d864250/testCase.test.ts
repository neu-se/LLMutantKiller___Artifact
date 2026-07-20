import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set behavior", () => {
  it("should set a property value on a fulfilled promise object", async () => {
    const obj: { [key: string]: any } = { foo: "original" };
    const promise = Q(obj);
    
    await promise.set("foo", "updated");
    
    expect(obj.foo).toBe("updated");
  });
});