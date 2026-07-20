const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf mutation detection", () => {
  it("should detect when valueOf is incorrectly executed on pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track execution of valueOf
    let executionCount = 0;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      executionCount++;
      return originalValueOf.call(this);
    };

    // First call - should execute in both versions
    promise.valueOf();
    const firstCount = executionCount;

    // Second call - in original code, should not execute again for pending promise
    // In mutated code, will always execute
    promise.valueOf();

    // In original: firstCount should be 1, executionCount should still be 1
    // In mutated: firstCount is 1, executionCount becomes 2
    expect(executionCount).toBe(firstCount);
  });
});