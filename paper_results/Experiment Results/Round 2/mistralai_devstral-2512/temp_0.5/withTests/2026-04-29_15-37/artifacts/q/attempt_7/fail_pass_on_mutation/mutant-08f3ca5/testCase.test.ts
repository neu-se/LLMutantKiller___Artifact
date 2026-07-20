import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should notify all progress listeners even when one throws", async () => {
    const deferred = Q.defer();
    let progressValues: number[] = [];
    let errorThrown = false;

    // Set up error handler
    const originalOnerror = Q.onerror;
    Q.onerror = (error: any) => {
      errorThrown = true;
    };

    // First progress listener that throws
    deferred.promise.progress((value: number) => {
      progressValues.push(value);
      throw new Error("Progress error");
    });

    // Second progress listener that should still be called
    deferred.promise.progress((value: number) => {
      progressValues.push(value);
    });

    // Third progress listener to verify all are called
    deferred.promise.progress((value: number) => {
      progressValues.push(value);
    });

    // Notify with a value
    deferred.notify(42);

    // Give time for progress handlers to execute
    await new Promise(resolve => setTimeout(resolve, 10));

    // Restore original error handler
    Q.onerror = originalOnerror;

    // Verify that all progress listeners were called with correct value despite the error
    expect(progressValues).toEqual([42, 42, 42]);
    expect(errorThrown).toBe(true);

    // Resolve to clean up
    deferred.resolve();
  });
});