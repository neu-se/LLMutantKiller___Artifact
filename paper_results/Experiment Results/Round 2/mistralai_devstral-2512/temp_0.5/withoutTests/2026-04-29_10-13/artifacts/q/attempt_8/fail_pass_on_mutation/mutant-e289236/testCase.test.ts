const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf mutation detection", () => {
  it("should detect when valueOf executes incorrectly on pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track if valueOf's internal logic executes
    let internalLogicExecuted = false;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      // This wrapper should always execute
      const result = originalValueOf.call(this);

      // Check if the internal logic executed by seeing if result is the promise itself
      // In original code, for pending promises, it should return the promise
      // In mutated code, the behavior changes
      if (result === promise) {
        internalLogicExecuted = true;
      }
      return result;
    };

    // Call valueOf
    promise.valueOf();

    // In original code: internalLogicExecuted should be true for pending promises
    // In mutated code: the condition change affects this behavior
    expect(internalLogicExecuted).toBe(true);
  });
});