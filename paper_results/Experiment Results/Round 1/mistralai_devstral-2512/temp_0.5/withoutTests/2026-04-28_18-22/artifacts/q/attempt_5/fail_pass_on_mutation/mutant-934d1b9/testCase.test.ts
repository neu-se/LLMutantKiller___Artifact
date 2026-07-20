const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution", () => {
  it("should prevent multiple resolutions of the same deferred", (done) => {
    const deferred = Q.defer();
    let resolveCount = 0;

    deferred.promise.then(() => {
      resolveCount++;
    });

    // Try to resolve twice
    deferred.resolve("first");
    deferred.resolve("second");

    setTimeout(() => {
      expect(resolveCount).toBe(1);
      done();
    }, 10);
  });
});