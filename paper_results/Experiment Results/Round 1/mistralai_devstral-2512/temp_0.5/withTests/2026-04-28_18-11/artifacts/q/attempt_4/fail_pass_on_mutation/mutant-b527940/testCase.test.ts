const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly identify and untrack promise at index 0", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the promise to trigger untracking
    return promise.catch(() => {
      // The mutation changes !== -1 to !== +1, which would fail to find index 0
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});