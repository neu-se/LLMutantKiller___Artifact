import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should notify progress listeners even when progress handler throws", async () => {
    const deferred = Q.defer();
    let progressValue: number | undefined;
    let errorCaught = false;

    // Set up a global error handler to catch the thrown error
    Q.onerror = (error) => {
      errorCaught = true;
    };

    const promise = deferred.promise.then(
      () => {
        // Should not reach here if progress throws
        expect(true).toBe(false);
      },
      () => {
        // Should not reach here if progress throws
        expect(true).toBe(false);
      },
      (value: number) => {
        progressValue = value;
      }
    );

    // Attach a progress handler that throws
    deferred.promise.progress(() => {
      throw new Error("Progress error");
    });

    // Notify with a value
    deferred.notify(42);

    // Resolve the promise after a small delay to ensure progress is processed
    setTimeout(() => {
      deferred.resolve();
    }, 10);

    await promise;

    // Verify that the progress listener was called despite the error
    expect(progressValue).toBe(42);
    expect(errorCaught).toBe(true);

    // Clean up
    Q.onerror = null;
  });
});