const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly clean up unhandled rejection tracking when rejection is found", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Cause a rejection
    deferred.reject(new Error("test error"));

    // Get the initial tracking state
    const initialReasons = Q.getUnhandledReasons();
    expect(initialReasons.length).toBe(1);

    // Handle the rejection
    await promise.catch(() => {
      // Rejection is now handled
    });

    // After handling, verify the rejection was properly removed from tracking
    // The mutated code will fail this because it always returns early in untrackRejection
    // when checking `if (true)` instead of `if (at !== -1)`
    const finalReasons = Q.getUnhandledReasons();
    expect(finalReasons.length).toBe(0);

    // Additional verification that the specific rejection was removed
    expect(finalReasons).not.toContain(initialReasons[0]);
  });
});