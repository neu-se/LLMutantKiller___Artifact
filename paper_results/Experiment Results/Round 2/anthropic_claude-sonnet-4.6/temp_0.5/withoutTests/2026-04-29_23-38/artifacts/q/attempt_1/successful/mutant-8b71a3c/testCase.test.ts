import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", async () => {
    // Create a fulfilled promise using Q.fulfill
    const value = 42;
    const fulfilledPromise = Q(value);
    
    // For a fulfilled promise, valueOf() should return the actual value
    // In the original code: state === "pending" -> return promise; else return inspected.value
    // In the mutated code: state !== "pending" -> return promise; else return inspected.value
    // So for a fulfilled promise (state === "fulfilled"):
    // Original: condition is false, returns inspected.value (42)
    // Mutated: condition is true (fulfilled !== pending), returns promise object
    
    const result = fulfilledPromise.valueOf();
    
    // In original code, valueOf() on a fulfilled promise returns the value (42)
    // In mutated code, valueOf() on a fulfilled promise returns the promise itself
    expect(result).toBe(value);
    expect(result).not.toBeInstanceOf(Object.getPrototypeOf(fulfilledPromise).constructor);
  });
});