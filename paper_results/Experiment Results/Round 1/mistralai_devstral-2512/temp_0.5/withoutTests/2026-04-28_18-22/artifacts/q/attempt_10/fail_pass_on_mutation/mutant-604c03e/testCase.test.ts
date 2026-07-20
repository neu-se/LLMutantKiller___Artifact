const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly clean up rejection tracking when rejection is found in array", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Cause a rejection
    deferred.reject(new Error("test error"));

    // Verify rejection is tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    await promise.catch(() => {});

    // Verify cleanup - this will fail on mutated code
    // because the mutation changes the condition from `if (at !== -1)`
    // to `if (true)`, causing early return and preventing cleanup
    expect(Q.getUnhandledReasons().length).toBe(0);

    // Additional check to verify the mutation's effect
    // The mutated code will leave the rejection in the tracking arrays
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});