const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Cause a rejection
    deferred.reject(new Error("test error"));

    // Initially, the rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    await promise.catch(() => {
      // Rejection is now handled
    });

    // After handling, the rejection should be untracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});