const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler error propagation", () => {
  it("should throw errors from progress handlers when no error handler is present", (done) => {
    // Store original handlers
    const originalOnerror = Q.onerror;
    Q.onerror = undefined;

    // Create a promise with a progress handler that throws
    const deferred = Q.defer();
    const testError = new Error("Progress handler error");

    // Set up unhandled rejection listener
    const rejectionListener = (reason: any) => {
      if (reason === testError) {
        cleanup();
        done();
      }
    };

    process.on('unhandledRejection', rejectionListener);

    // Create promise with progress handler that throws
    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        throw testError;
      }
    );

    // Trigger progress notification
    deferred.notify("progress");

    // Cleanup function
    function cleanup() {
      process.removeListener('unhandledRejection', rejectionListener);
      Q.onerror = originalOnerror;
    }

    // Timeout to fail test if error isn't thrown
    setTimeout(() => {
      cleanup();
      done(new Error("Error was not propagated from progress handler"));
    }, 100);
  });
});