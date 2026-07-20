const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should prevent duplicate execution when promise is resolved after then is called", (done) => {
    let executionCount = 0;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      executionCount++;
      expect(value).toBe(42);
    });

    // Resolve the promise after setting up the then handler
    deferred.resolve(42);

    // Try to resolve again immediately
    deferred.resolve(43);

    // Give time for async operations
    setTimeout(() => {
      expect(executionCount).toBe(1);
      done();
    }, 50);
  });
});