import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a pending promise, not true", async () => {
    const deferred = Q.defer();
    // A pending promise is not rejected, so isRejected should return false
    const pendingPromise = deferred.promise;
    expect(Q.isRejected(pendingPromise)).toBe(false);
  });
});