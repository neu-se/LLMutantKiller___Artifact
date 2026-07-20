import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
    const fulfilledValue = 42;
    const promise = Q.fulfill(fulfilledValue);
    
    // For a fulfilled promise, valueOf() should return the actual value, not the promise itself
    const result = promise.valueOf();
    
    expect(result).toBe(fulfilledValue);
    expect(result).not.toBe(promise);
  });
});