import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect", () => {
  it("should return the inspect state of the underlying object when inspect is called on a master promise", () => {
    const obj = { value: 42 };
    const masterPromise = Q.master(obj);
    
    const inspected = masterPromise.inspect();
    
    expect(inspected).toBeDefined();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(obj);
  });
});