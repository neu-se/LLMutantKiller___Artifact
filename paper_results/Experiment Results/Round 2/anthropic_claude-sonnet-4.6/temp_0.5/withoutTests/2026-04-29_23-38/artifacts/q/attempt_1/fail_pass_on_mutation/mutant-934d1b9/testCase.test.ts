import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer resolve idempotency", () => {
  it("should not allow resolving a deferred promise more than once", async () => {
    const deferred = Q.defer();
    
    // Resolve the deferred with a value
    deferred.resolve(42);
    
    // Try to resolve again with a different value - in original code,
    // the `if (resolvedPromise)` guard prevents this second resolve from taking effect
    // In mutated code, `if (false)` means the guard never triggers, allowing re-resolution
    deferred.resolve(99);
    
    const value = await deferred.promise;
    
    // The first resolution should win - value should be 42, not 99
    expect(value).toBe(42);
  });
});