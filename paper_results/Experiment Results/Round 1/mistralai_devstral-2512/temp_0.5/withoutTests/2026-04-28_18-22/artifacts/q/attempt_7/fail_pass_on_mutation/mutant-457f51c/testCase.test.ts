const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior with pending promise", () => {
  it("should return the promise itself when promise is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Don't resolve or reject - keep it pending
    // In the original code, valueOf returns the promise when state is "pending"
    // In the mutated code, the condition is always true, which would incorrectly
    // set exception property even for pending promises
    expect(promise.valueOf()).toBe(promise);
    expect(promise.exception).toBeUndefined();
  });
});