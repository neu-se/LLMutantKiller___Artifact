import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
  it("should return true for a pending promise and false for a fulfilled promise", async () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;

    // A pending promise should return true for isPending
    expect(Q.isPending(pendingPromise)).toBe(true);

    // Resolve the promise
    deferred.resolve(42);

    // Wait for the promise to settle
    await pendingPromise;

    // A fulfilled promise should return false for isPending
    expect(Q.isPending(pendingPromise)).toBe(false);
  });
});