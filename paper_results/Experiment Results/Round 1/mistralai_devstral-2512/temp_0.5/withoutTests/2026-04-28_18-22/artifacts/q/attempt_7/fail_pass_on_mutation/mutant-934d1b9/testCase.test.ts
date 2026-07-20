const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution", () => {
  it("should properly handle deferred resolution state", (done) => {
    const deferred = Q.defer();
    let resolutionOrder: string[] = [];

    deferred.promise.then(() => {
      resolutionOrder.push("first");
    });

    // First resolution
    deferred.resolve("value1");

    // Second resolution attempt
    deferred.promise.then(() => {
      resolutionOrder.push("second");
    });

    // Third resolution attempt
    deferred.resolve("value2");

    setTimeout(() => {
      expect(resolutionOrder).toEqual(["first", "second"]);
      done();
    }, 20);
  });
});