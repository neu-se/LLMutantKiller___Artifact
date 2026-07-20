const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections when rejection is found in tracking array", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

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
    // This will fail on the mutated code because it always returns early
    // in the untrackRejection function, preventing proper cleanup
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});