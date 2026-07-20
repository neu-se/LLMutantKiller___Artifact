const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const result = promise.valueOf();
    // The original code returns the promise when pending
    // The mutated code would return undefined (inspected.value for pending)
    expect(result).toBe(promise);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('promiseDispatch');
  });
});