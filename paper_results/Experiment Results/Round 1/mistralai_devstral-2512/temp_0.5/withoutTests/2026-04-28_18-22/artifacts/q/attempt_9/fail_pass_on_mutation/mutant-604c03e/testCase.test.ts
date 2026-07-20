const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly remove handled rejections from tracking arrays", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Cause a rejection
    deferred.reject(new Error("test error"));

    // Verify rejection is tracked
    const initialReasons = Q.getUnhandledReasons();
    expect(initialReasons.length).toBe(1);

    // Handle the rejection
    await promise.catch(() => {});

    // Verify cleanup - this will fail on mutated code
    // because the mutation changes the condition from `if (at !== -1)`
    // to `if (true)`, causing early return and preventing cleanup
    const finalReasons = Q.getUnhandledReasons();
    expect(finalReasons.length).toBe(0);

    // Additional verification that internal arrays were cleaned
    // This checks the side effect of the mutation
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});