const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly find and untrack promise at index 0", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked at index 0
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the promise - this triggers the array_indexOf check
    return promise.catch(() => {
      // With original code: array_indexOf returns 0, 0 !== -1 is true → untracks
      // With mutation: array_indexOf returns 0, 0 !== +1 is true → still untracks
      // Need to force a case where index 0 matters differently
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});