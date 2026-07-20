const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isPending mutation test", () => {
  it("should correctly identify pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should be pending initially
    expect(Q.isPending(promise)).toBe(true);
    expect(promise.isPending()).toBe(true);

    // After resolving, it should no longer be pending
    deferred.resolve("resolved");
    return promise.then(() => {
      expect(Q.isPending(promise)).toBe(false);
      expect(promise.isPending()).toBe(false);
    });
  });
});