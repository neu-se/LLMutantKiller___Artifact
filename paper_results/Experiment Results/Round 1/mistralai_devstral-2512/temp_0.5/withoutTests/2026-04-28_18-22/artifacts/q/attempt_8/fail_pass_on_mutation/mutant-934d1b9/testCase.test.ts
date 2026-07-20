const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution state", () => {
  it("should correctly track resolvedPromise state to prevent duplicate resolutions", (done) => {
    const deferred = Q.defer();
    let callbackCount = 0;

    deferred.promise.then(() => {
      callbackCount++;
    });

    // First resolution
    deferred.resolve("first");

    // Attempt second resolution
    deferred.resolve("second");

    // Check state immediately
    expect(callbackCount).toBe(0);

    setTimeout(() => {
      expect(callbackCount).toBe(1);
      done();
    }, 10);
  });
});