import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
  it("should return the fulfilled value when given a fulfilled promise, not the promise itself", async () => {
    const fulfilledValue = 42;
    const fulfilledPromise = Q(fulfilledValue);
    
    const result = Q.nearer(fulfilledPromise);
    
    // In the original code, nearer returns inspected.value when state === "fulfilled"
    // In the mutated code, nearer returns inspected.value when state !== "fulfilled" (wrong branch)
    // So for a fulfilled promise, original returns 42, mutant returns the promise itself
    expect(result).toBe(fulfilledValue);
    expect(result).not.toBe(fulfilledPromise);
  });
});