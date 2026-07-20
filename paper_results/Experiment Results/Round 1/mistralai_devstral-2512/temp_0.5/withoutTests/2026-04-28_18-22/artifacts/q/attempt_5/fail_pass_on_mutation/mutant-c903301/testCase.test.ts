const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler error propagation", () => {
  it("should propagate errors thrown in progress handlers", (done) => {
    // Store the original onerror handler
    const originalOnerror = Q.onerror;
    let errorCaught = false;

    // Set up a custom error handler
    Q.onerror = (error: Error) => {
      errorCaught = true;
      expect(error.message).toBe("Test error from progress handler");
      Q.onerror = originalOnerror;
      done();
    };

    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      () => {
        throw new Error("Test error from progress handler");
      }
    );

    // Trigger progress notification
    deferred.notify("progress");

    // If error wasn't caught after some time, fail the test
    setTimeout(() => {
      if (!errorCaught) {
        Q.onerror = originalOnerror;
        done(new Error("Error was not propagated from progress handler"));
      }
    }, 50);
  });
});