import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout", () => {
  it("should resolve with the fulfilled value when the promise resolves before the timeout", async () => {
    const deferred = Q.defer();
    
    // Resolve the deferred immediately with a specific value
    deferred.resolve(42);
    
    // Apply a generous timeout - the promise should resolve before it
    const result = await deferred.promise.timeout(1000);
    
    expect(result).toBe(42);
  });
});