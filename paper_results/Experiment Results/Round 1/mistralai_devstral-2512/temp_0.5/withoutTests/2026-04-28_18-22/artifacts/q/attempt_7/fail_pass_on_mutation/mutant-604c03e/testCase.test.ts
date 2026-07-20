const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly remove handled rejections from tracking array", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Cause a rejection
    const error = new Error("test error");
    deferred.reject(error);

    // Get initial state
    const initialReasons = Q.getUnhandledReasons();
    expect(initialReasons.length).toBe(1);
    expect(initialReasons[0]).toContain("test error");

    // Handle the rejection
    await promise.catch(() => {});

    // Verify cleanup - this will fail on mutated code
    // because the mutation causes untrackRejection to return early
    // when it should be removing the rejection from tracking arrays
    const finalReasons = Q.getUnhandledReasons();
    expect(finalReasons.length).toBe(0);

    // Additional check that the specific error was removed
    expect(finalReasons).not.toContain(initialReasons[0]);
  });
});