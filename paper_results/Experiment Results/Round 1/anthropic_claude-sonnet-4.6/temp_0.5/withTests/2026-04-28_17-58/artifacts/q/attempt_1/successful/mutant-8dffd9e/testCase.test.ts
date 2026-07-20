import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
  it("should return true for a pending promise and false for a fulfilled promise", () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;
    
    // A pending (unresolved) deferred promise should be pending
    expect(Q.isPending(pendingPromise)).toBe(true);
    
    // A fulfilled promise should NOT be pending
    const fulfilledPromise = Q(42);
    expect(Q.isPending(fulfilledPromise)).toBe(false);
  });
});