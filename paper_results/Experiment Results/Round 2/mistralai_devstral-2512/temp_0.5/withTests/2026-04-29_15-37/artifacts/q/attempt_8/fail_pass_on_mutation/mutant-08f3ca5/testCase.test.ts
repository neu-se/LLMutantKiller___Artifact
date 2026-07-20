import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should notify all progress listeners even when one throws", async () => {
    const deferred = Q.defer();
    let progressCount = 0;
    let errorThrown = false;

    // Set up error handler
    const originalOnerror = Q.onerror;
    Q.onerror = (error: any) => {
      errorThrown = true;
    };

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
    await new Promise(resolve => setTimeout(resolve, 10));

    // Restore original error handler
    Q.onerror = originalOnerror;

    // Verify that all progress listeners were called despite the error
    expect(progressCount).toBe(3);
    expect(errorThrown).toBe(true);

    // Now test the actual promise resolution
    let fulfilled = false;
    deferred.promise.then(() => {
      fulfilled = true;
    });

    // Resolve the promise
    deferred.resolve();

    // Wait for resolution
    await new Promise(resolve => setTimeout(resolve, 10));

    // Verify promise was fulfilled
    expect(fulfilled).toBe(true);
  });
});