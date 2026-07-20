import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress error handling", () => {
  it("should throw errors from progress callbacks", () => {
    const testError = new Error("progress callback error");
    let errorThrown = false;

    const deferred = Q.defer();
    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        throw testError;
      }
    );

    deferred.notify();

    return promise.then(
      () => {},
      (error: Error) => {
        errorThrown = true;
        expect(error).toBe(testError);
      }
    ).then(() => {
      expect(errorThrown).toBe(true);
    });
  });
});