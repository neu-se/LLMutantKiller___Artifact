import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
    const fulfilledPromise = Q(42);
    
    // For a fulfilled promise, valueOf() should return the actual value (42),
    // not the promise itself.
    // Original code: if (inspected.state === "pending" || ...) return promise;
    //   => pending/rejected returns promise, fulfilled returns value
    // Mutated code: if (inspected.state !== "pending" || ...) return promise;
    //   => fulfilled/rejected returns promise, pending returns value (wrong!)
    
    const result = fulfilledPromise.valueOf();
    
    // With original code: result === 42 (the fulfilled value)
    // With mutated code: result === fulfilledPromise (the promise object itself)
    expect(result).toBe(42);
  });
});