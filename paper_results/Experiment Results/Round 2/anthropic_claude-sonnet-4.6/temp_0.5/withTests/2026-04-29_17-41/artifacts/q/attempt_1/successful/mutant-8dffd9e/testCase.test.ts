import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
  it("should return true for a pending (unresolved) deferred promise and false for a fulfilled promise", () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;

    // A pending promise should return true
    expect(Q.isPending(pendingPromise)).toBe(true);

    // A fulfilled promise should return false
    const fulfilledPromise = Q(42);
    expect(Q.isPending(fulfilledPromise)).toBe(false);
  });
});