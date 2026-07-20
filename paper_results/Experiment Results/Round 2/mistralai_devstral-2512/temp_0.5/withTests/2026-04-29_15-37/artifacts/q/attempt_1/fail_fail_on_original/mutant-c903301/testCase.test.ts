import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handling", () => {
  it("should throw errors from progress callbacks to Q.onerror", (done) => {
    const testError = new Error("progress callback error");
    let onerrorCalled = false;

    Q.onerror = (error) => {
      onerrorCalled = true;
      expect(error).toBe(testError);
      done();
    };

    const deferred = Q.defer();
    deferred.promise.progress(() => {
      throw testError;
    });

    deferred.notify();
  });
});