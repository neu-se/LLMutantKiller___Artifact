import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
    // Create a fulfilled promise using Q.fulfill (via Q with a non-thenable value)
    const value = { answer: 42 };
    const fulfilledPromise = Q(value);
    
    // For a fulfilled promise, valueOf() should return the actual value,
    // not the promise itself.
    // In the original code: if state is "pending" or "rejected", return promise; else return inspected.value
    // In the mutated code: always return promise (due to `if (true)`)
    const result = fulfilledPromise.valueOf();
    
    // The result should be the actual value, not the promise
    expect(result).toBe(value);
    expect(result).not.toBe(fulfilledPromise);
  });
});