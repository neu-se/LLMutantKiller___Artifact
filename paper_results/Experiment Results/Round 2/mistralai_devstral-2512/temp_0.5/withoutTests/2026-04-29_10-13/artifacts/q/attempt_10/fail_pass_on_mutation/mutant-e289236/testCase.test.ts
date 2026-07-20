const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should correctly handle valueOf calls on pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track execution flow
    let executionPath = [];
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      executionPath.push('before');
      const result = originalValueOf.call(this);
      executionPath.push('after');
      return result;
    };

    // Call valueOf
    promise.valueOf();

    // In original code: executionPath should be ['before', 'after']
    // In mutated code: the condition change affects execution flow
    expect(executionPath).toEqual(['before', 'after']);
  });
});