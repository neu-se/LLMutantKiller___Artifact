const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isPending mutation test", () => {
  it("should correctly identify pending promises", () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;

    // The promise should be identified as pending before resolution
    expect(Q.isPending(pendingPromise)).toBe(true);

    // Resolve the promise
    deferred.resolve("resolved");

    // After resolution, the promise should no longer be pending
    return pendingPromise.then(() => {
      expect(Q.isPending(pendingPromise)).toBe(false);
    });
  });
});