import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress error handling", () => {
  it("should handle errors thrown in progress callbacks", () => {
    const testError = new Error("progress callback error");
    let progressCalled = false;
    let errorCaught = false;

    const deferred = Q.defer();
    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        progressCalled = true;
        throw testError;
      }
    );

    deferred.notify();

    return Q.delay(10).then(() => {
      expect(progressCalled).toBe(true);
    });
  });
});