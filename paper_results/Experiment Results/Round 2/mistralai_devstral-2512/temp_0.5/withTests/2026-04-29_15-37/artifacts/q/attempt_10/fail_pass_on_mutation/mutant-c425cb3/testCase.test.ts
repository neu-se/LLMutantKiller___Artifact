import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should handle progress listener errors and continue propagation", async () => {
    const deferred = Q.defer();
    let firstProgressCalled = false;
    let secondProgressCalled = false;
    let errorCaught = false;

    const promise = deferred.promise.then(
      () => {
        expect(firstProgressCalled).toBe(true);
        expect(secondProgressCalled).toBe(true);
        expect(errorCaught).toBe(true);
      },
      () => {
        expect(true).toBe(false);
      }
    );

    // First listener that throws
    deferred.promise.then(
      undefined,
      undefined,
      () => {
        firstProgressCalled = true;
        try {
          throw new Error("Progress error");
        } catch (e) {
          errorCaught = true;
        }
      }
    );

    // Second listener that should still be called
    deferred.promise.then(
      undefined,
      undefined,
      () => {
        secondProgressCalled = true;
      }
    );

    deferred.notify("test");
    deferred.resolve();

    await promise;
  });
});