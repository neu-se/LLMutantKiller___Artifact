const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution", () => {
  it("should not allow multiple resolutions of the same deferred", (done) => {
    const deferred = Q.defer();
    let resolutionCount = 0;

    deferred.promise.then(() => {
      resolutionCount++;
    });

    // Try to resolve twice
    deferred.resolve("first");
    deferred.resolve("second");

    setTimeout(() => {
      expect(resolutionCount).toBe(1);
      done();
    }, 10);
  });
});