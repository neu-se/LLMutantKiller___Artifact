import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should not notify downstream listeners when progress listener throws", async () => {
    const deferred = Q.defer();
    let firstProgressCalled = false;
    let secondProgressCalled = false;

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