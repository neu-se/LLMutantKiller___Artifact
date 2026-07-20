const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise when pending and not execute the fallthrough return statement", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track if the fallthrough return statement is executed
    let fallthroughExecuted = false;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function() {
      const result = originalValueOf.call(this);
      // If result is not the promise itself, the fallthrough was executed
      if (result !== promise) {
        fallthroughExecuted = true;
      }
      return result;
    };

    // Force inspect to return pending state
    promise.inspect = function() {
      return { state: "pending" };
    };

    const result = promise.valueOf();

    // In original code: returns promise (fallthrough not executed)
    // In mutated code: would execute fallthrough and potentially return inspected.value
    expect(result).toBe(promise);
    expect(fallthroughExecuted).toBe(false);
  });
});