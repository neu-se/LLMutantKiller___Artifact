import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del dispatch operation", () => {
  it("should dispatch the 'delete' operation when Q.del is called on an object", async () => {
    const obj: { [key: string]: number } = { foo: 42, bar: 99 };
    
    // Q.del should delete the property by dispatching "delete" operation
    await Q.del(obj, "foo");
    
    // If the original code is used, "delete" operation is dispatched and the property is removed
    // If the mutated code is used, "" operation is dispatched which does nothing meaningful
    expect(obj.hasOwnProperty("foo")).toBe(false);
  });
});