const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution state", () => {
  it("should prevent multiple promise resolutions when resolvedPromise exists", (done) => {
    const deferred = Q.defer();
    const executionOrder: string[] = [];

    deferred.promise.then(() => {
      executionOrder.push("first");
    }).then(() => {
      executionOrder.push("second");
    });

    // First resolution
    deferred.resolve("value1");

    // This should be ignored in original code but might execute in mutated code
    deferred.resolve("value2");

    setTimeout(() => {
      // In original code, only first resolution should trigger the chain
      // In mutated code, both resolutions might trigger the chain
      expect(executionOrder).toEqual(["first", "second"]);
      done();
    }, 20);
  });
});