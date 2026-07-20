import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should correctly resolve all promises including a mix of fulfilled and pending promises", async () => {
    const deferred = Q.defer();
    
    // Mix: one already-fulfilled promise and one pending deferred
    const fulfilledPromise = Q(42);
    const pendingPromise = deferred.promise;
    
    const allPromise = Q.all([fulfilledPromise, pendingPromise]);
    
    // Resolve the pending promise after a tick
    deferred.resolve(99);
    
    const result = await allPromise;
    // With original code: fulfilledPromise is handled synchronously (snapshot),
    // pendingPromise goes through when() - result should be [42, 99]
    // With mutated code: pendingCount stays 0 immediately (pending promise skips when()),
    // deferred.resolve is called with [42, unresolved] before pendingPromise resolves
    expect(result).toEqual([42, 99]);
  });
});