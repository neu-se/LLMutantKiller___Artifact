import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise progress handler error propagation", () => {
  it("should propagate errors thrown in progress handlers", (done) => {
    const testError = new Error("Test error from progress handler");
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      () => {
        throw testError;
      }
    );

    // Give the progress handler time to execute
    setTimeout(() => {
      deferred.resolve("test value");
    }, 0);

    // The promise should eventually be rejected with our test error
    promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error: Error) => {
        expect(error).toBe(testError);
        done();
      }
    );
  });
});