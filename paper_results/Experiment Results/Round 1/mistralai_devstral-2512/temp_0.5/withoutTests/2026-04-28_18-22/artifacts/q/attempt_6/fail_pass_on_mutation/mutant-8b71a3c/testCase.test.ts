const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise when pending and not the inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Override inspect to return a fake fulfilled state
    const originalInspect = promise.inspect;
    promise.inspect = function() {
      return { state: "fulfilled", value: "fake value" };
    };

    const result = promise.valueOf();

    // In original code, should return promise (not fall through to inspected.value)
    // In mutated code, would return "fake value" due to the inverted condition
    expect(result).toBe(promise);
    expect(result).not.toBe("fake value");

    // Restore original inspect
    promise.inspect = originalInspect;
  });
});