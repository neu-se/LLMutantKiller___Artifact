import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf for fulfilled promise", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
    // Q.fulfill creates a fulfilled promise using the Promise constructor with an inspect function
    // that returns { state: "fulfilled", value: value }
    // The valueOf method should return the actual value for fulfilled promises
    const fulfilledPromise = Q.fulfill(42);
    
    // In the original code: state === "pending" is false, state === "rejected" is false,
    // so valueOf returns inspected.value (42)
    // In the mutated code: state !== "pending" is true (since "fulfilled" !== "pending"),
    // so valueOf returns the promise itself instead of 42
    const result = fulfilledPromise.valueOf();
    
    expect(result).toBe(42);
  });
});