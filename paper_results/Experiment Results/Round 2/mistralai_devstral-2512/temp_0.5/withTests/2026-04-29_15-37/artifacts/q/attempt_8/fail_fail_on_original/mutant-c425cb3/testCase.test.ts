import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should stop progress propagation when listener throws", async () => {
    const deferred = Q.defer();
    let firstProgressCalled = false;
    let secondProgressCalled = false;

    // Set up error handler to prevent test failure
    Q.onerror = () => {};

    const promise = deferred.promise.then(
      () => {
        expect(firstProgressCalled).toBe(true);
        expect(secondProgressCalled).toBe(false);
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
        throw new Error("Progress error");
      }
    );

    // Second listener that should not be called
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