const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should fail when promise at index 0 is not properly untracked due to mutation", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the promise
    return promise.catch(() => {
      // With original code: index 0 is found (0 !== -1) and untracked
      // With mutation: index 0 is NOT found (0 !== +1) so NOT untracked
      // This should fail on mutated code because the rejection remains tracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});