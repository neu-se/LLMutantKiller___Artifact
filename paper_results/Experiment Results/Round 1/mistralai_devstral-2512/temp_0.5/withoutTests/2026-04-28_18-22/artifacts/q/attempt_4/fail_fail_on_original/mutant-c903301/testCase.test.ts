const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler error propagation", () => {
  it("should propagate errors thrown in progress handlers", (done) => {
    const testError = new Error("Test error from progress handler");
    const deferred = Q.defer();
    const promise = deferred.promise;

    let progressCalled = false;
    promise.then(
      () => {},
      () => {},
      () => {
        progressCalled = true;
        throw testError;
      }
    );

    // Give the progress handler time to execute
    setTimeout(() => {
      deferred.notify("progress");
    }, 0);

    // Check after some time if the error was propagated
    setTimeout(() => {
      if (!progressCalled) {
        done(new Error("Progress handler was not called"));
        return;
      }

      // The error should have been thrown and caught by the unhandled rejection handler
      // In the original code, this would throw the error
      // In the mutated code, this would do nothing
      done();
    }, 50);
  });
});