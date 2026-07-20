const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise for rejected state but not for pending state", () => {
    // Test with rejected promise
    const deferred1 = Q.defer();
    const rejectedPromise = deferred1.promise;
    deferred1.reject(new Error("test error"));
    const rejectedResult = rejectedPromise.valueOf();

    // Test with pending promise
    const deferred2 = Q.defer();
    const pendingPromise = deferred2.promise;
    const pendingResult = pendingPromise.valueOf();

    // In original code:
    // - rejected promise returns itself
    // - pending promise returns itself
    // In mutated code:
    // - rejected promise returns inspected.value (the error)
    // - pending promise returns itself
    expect(rejectedResult).toBe(rejectedPromise);
    expect(pendingResult).toBe(pendingPromise);
  });
});