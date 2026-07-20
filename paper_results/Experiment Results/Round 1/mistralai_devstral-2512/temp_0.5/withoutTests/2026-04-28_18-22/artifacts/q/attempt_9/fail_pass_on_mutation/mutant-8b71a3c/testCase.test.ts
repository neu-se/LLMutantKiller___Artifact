const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise when pending and not return inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Override inspect to return a fulfilled state with a specific value
    const originalInspect = promise.inspect;
    promise.inspect = function() {
      return { state: "fulfilled", value: "SHOULD_NOT_RETURN_THIS" };
    };

    const result = promise.valueOf();

    // In original code: returns promise when pending (doesn't fall through)
    // In mutated code: would return "SHOULD_NOT_RETURN_THIS" due to inverted condition
    expect(result).toBe(promise);
    expect(result).not.toBe("SHOULD_NOT_RETURN_THIS");

    // Restore original inspect
    promise.inspect = originalInspect;
  });
});