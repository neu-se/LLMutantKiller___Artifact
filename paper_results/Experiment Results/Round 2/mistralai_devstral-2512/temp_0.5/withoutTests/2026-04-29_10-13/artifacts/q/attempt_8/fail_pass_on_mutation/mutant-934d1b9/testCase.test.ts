const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution state", () => {
  it("should maintain correct resolution state after first resolution", (done) => {
    const deferred = Q.defer();
    let resolutionCount = 0;

    deferred.promise.then(() => {
      resolutionCount++;
    });

    // First resolution
    deferred.resolve("value1");

    // Second resolution attempt (should be ignored in original code)
    deferred.resolve("value2");

    // Third resolution attempt (should also be ignored)
    deferred.resolve("value3");

    setTimeout(() => {
      expect(resolutionCount).toBe(1);
      done();
    }, 10);
  });
});