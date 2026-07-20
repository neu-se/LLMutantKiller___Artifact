const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when pending and not execute the fallthrough case", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create a promise that will never resolve to test pending state
    let valueOfCalled = false;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      valueOfCalled = true;
      return originalValueOf.call(this);
    };

    // Force inspect to return pending state
    const originalInspect = promise.inspect;
    promise.inspect = function() {
      return { state: "pending" };
    };

    const result = promise.valueOf();

    // In original code: returns promise when pending
    // In mutated code: would execute fallthrough and potentially return something else
    expect(result).toBe(promise);
    expect(valueOfCalled).toBe(true);

    // Restore
    promise.valueOf = originalValueOf;
    promise.inspect = originalInspect;
  });
});