const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should prevent multiple executions of fulfilled callback when promise is already resolved", (done) => {
    let executionCount = 0;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      executionCount++;
      return value;
    });

    // Resolve the promise
    deferred.resolve(42);

    // Try to resolve again (should be ignored)
    deferred.resolve(43);

    // Give time for async operations
    setTimeout(() => {
      expect(executionCount).toBe(1);
      done();
    }, 50);
  });
});