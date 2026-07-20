import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect", () => {
  it("should return the inspect result of the wrapped object when inspect is called on a master promise", async () => {
    const value = { foo: "bar" };
    const masterPromise = Q.master(value);
    
    // The master promise wraps the object, and its inspect should delegate
    // to Q(object).inspect() which should return { state: "fulfilled", value: value }
    const inspected = masterPromise.inspect();
    
    expect(inspected).toBeDefined();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(value);
  });
});