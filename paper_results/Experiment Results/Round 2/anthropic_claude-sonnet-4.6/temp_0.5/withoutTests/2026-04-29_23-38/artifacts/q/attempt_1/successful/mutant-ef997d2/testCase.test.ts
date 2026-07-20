import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect function", () => {
  it("should return the inspect result of the wrapped object when inspect is called on a master promise", () => {
    const value = 42;
    const masterPromise = Q.master(value);
    
    // The inspect function of a master promise should delegate to Q(object).inspect()
    // Q(42) is a fulfilled promise, so inspect() should return { state: "fulfilled", value: 42 }
    const inspected = masterPromise.inspect();
    
    // In the original code, inspect returns Q(object).inspect() which gives { state: "fulfilled", value: 42 }
    // In the mutated code, inspect returns undefined
    expect(inspected).toBeDefined();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
  });
});