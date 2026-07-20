import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should handle progress listener errors correctly", async () => {
    const deferred = Q.defer();
    let progressCalled = false;
    let errorHandled = false;

    // Set up error handler
    Q.onerror = (error: Error) => {
      errorHandled = true;
    };

    const promise = deferred.promise.then(
      () => {
        expect(progressCalled).toBe(true);
        expect(errorHandled).toBe(true);
      },
      () => {
        expect(true).toBe(false);
      },
      () => {
        progressCalled = true;
        throw new Error("Progress error");
      }
    );

    deferred.notify("test");
    deferred.resolve();

    await promise;
  });
});