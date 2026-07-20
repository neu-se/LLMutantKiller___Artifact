const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should prevent multiple executions when promise is resolved asynchronously", (done) => {
    let executionCount = 0;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      executionCount++;
      expect(value).toBe(42);
    });

    // Resolve in next tick to ensure async behavior
    process.nextTick(() => {
      deferred.resolve(42);
      // Try to resolve again
      deferred.resolve(43);
    });

    setTimeout(() => {
      expect(executionCount).toBe(1);
      done();
    }, 100);
  });
});