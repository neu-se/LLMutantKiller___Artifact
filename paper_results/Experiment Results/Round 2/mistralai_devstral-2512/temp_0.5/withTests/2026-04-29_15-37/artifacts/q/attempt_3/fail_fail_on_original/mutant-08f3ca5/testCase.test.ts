import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should notify all progress listeners even when one throws", async () => {
    const deferred = Q.defer();
    let progressCount = 0;
    let errorCount = 0;

    // First progress listener that throws
    deferred.promise.progress(() => {
      progressCount++;
      throw new Error("Progress error");
    });

    // Second progress listener that should still be called
    deferred.promise.progress(() => {
      progressCount++;
    });

    // Third progress listener to verify all are called
    deferred.promise.progress(() => {
      progressCount++;
    });

    // Notify with a value
    deferred.notify(42);

    // Give time for progress handlers to execute
    await Q.delay(10);

    // Verify that all progress listeners were called despite the error
    expect(progressCount).toBe(3);

    // Resolve to clean up
    deferred.resolve();
  });
});