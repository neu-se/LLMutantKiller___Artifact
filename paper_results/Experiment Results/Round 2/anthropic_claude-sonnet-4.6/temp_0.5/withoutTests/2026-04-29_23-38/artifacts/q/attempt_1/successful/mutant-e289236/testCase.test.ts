import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf after resolution", () => {
  it("should return the resolved value when valueOf is called on a fulfilled deferred promise", async () => {
    const deferred = Q.defer();
    const expectedValue = 42;
    
    // Resolve the deferred with a non-thenable value
    deferred.resolve(expectedValue);
    
    // Wait for the promise to be resolved (nextTick processing)
    await new Promise<void>((resolve) => {
      deferred.promise.then(() => resolve());
    });
    
    // After resolution, valueOf should return the resolved value, not the promise itself
    const result = deferred.promise.valueOf();
    
    // In the original code: messages becomes undefined after resolution,
    // so valueOf returns the nearer value (the fulfilled value 42)
    // In the mutated code: if(true) always returns the promise itself
    expect(result).toBe(expectedValue);
  });
});