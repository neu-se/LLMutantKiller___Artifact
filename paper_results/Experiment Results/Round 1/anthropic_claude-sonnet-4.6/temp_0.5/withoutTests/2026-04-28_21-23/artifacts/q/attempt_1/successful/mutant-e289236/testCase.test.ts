import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf behavior after resolution", () => {
  it("should return the fulfilled value when valueOf is called on a resolved deferred promise", async () => {
    const deferred = Q.defer();
    const expectedValue = 42;
    
    // Resolve the deferred promise
    deferred.resolve(expectedValue);
    
    // Wait for the promise to be resolved
    await deferred.promise;
    
    // After resolution, valueOf should return the fulfilled value, not the promise itself
    const result = deferred.promise.valueOf();
    
    // In the original code: messages becomes undefined after resolution,
    // so if (messages) is false, and valueOf falls through to return the resolved value.
    // In the mutated code: if (true) always executes, returning the promise itself.
    expect(result).toBe(expectedValue);
  });
});