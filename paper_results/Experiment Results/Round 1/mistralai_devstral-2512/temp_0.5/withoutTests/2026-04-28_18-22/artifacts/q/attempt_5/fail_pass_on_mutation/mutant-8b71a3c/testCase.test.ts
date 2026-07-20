const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending and not fall through to return inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Spy on the inspect method to verify it's not being used to get a value
    const originalInspect = promise.inspect;
    let inspectCalled = false;
    promise.inspect = function() {
      inspectCalled = true;
      return originalInspect.call(this);
    };

    const result = promise.valueOf();

    // In original code, valueOf should return the promise itself without
    // falling through to return inspected.value
    expect(result).toBe(promise);
    expect(inspectCalled).toBe(false);
  });
});