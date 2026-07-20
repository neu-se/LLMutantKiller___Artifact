const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf mutation detection", () => {
  it("should detect when valueOf is called on pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track the number of times valueOf is called
    let callCount = 0;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      callCount++;
      return originalValueOf.call(this);
    };

    // First call
    promise.valueOf();
    const firstCallCount = callCount;

    // Resolve the promise
    deferred.resolve("resolved");

    // Second call after resolution
    promise.valueOf();

    // In original code: firstCallCount should be 1, callCount should be 2
    // In mutated code: the condition change affects the call count
    expect(callCount).toBe(firstCallCount + 1);
  });
});