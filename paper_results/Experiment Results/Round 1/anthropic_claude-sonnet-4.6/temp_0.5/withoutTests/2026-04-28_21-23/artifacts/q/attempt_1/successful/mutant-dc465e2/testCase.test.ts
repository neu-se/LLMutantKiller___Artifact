import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should resolve with the value when the promise fulfills before the timeout", async () => {
    const deferred = Q.defer();
    
    // Resolve the deferred immediately with a value
    deferred.resolve(42);
    
    // The timeout promise should resolve with the value 42
    const result = await deferred.promise.timeout(1000);
    
    expect(result).toBe(42);
  });
});