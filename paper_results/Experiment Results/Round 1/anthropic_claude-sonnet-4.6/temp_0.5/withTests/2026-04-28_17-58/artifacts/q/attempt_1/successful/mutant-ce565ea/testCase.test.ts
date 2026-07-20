import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for fulfilled promises", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
    // Create a fulfilled promise with a specific value
    const fulfilledValue = 42;
    const promise = Q.fulfill(fulfilledValue);

    // In the original code, valueOf on a fulfilled promise returns the value
    // In the mutated code (if (true)), valueOf always returns the promise itself
    const result = promise.valueOf();

    // The original code returns the inspected value for fulfilled promises
    // The mutation makes it always return the promise (since if(true) always enters the branch)
    expect(result).toBe(fulfilledValue);
  });
});