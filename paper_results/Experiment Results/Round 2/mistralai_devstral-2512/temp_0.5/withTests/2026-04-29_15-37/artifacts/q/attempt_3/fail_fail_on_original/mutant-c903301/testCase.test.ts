import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress error handling", () => {
  it("should propagate errors thrown in progress callbacks", () => {
    const testError = new Error("progress callback error");
    let errorCaught = false;

    Q.onerror = (error: Error) => {
      errorCaught = true;
      expect(error).toBe(testError);
    };

    const deferred = Q.defer();
    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        throw testError;
      }
    );

    deferred.notify();

    return promise.then(() => {
      expect(errorCaught).toBe(true);
    });
  });
});