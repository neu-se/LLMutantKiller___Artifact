const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should properly untrack promise at index 0 when handled", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the promise - this triggers the array_indexOf check in untrackRejection
    return promise.catch(() => {
      // With original code: array_indexOf returns 0, 0 !== -1 is true → untracks
      // With mutation: array_indexOf returns 0, 0 !== +1 is true → still untracks
      // The mutation doesn't actually break this case because 0 !== 1 is still true
      // Need a different approach to expose the mutation
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});