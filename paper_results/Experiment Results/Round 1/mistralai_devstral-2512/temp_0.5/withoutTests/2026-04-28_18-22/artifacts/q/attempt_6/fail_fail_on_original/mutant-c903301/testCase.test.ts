const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler error propagation", () => {
  it("should throw errors from progress handlers when Q.onerror is not set", (done) => {
    // Ensure Q.onerror is not set
    const originalOnerror = Q.onerror;
    Q.onerror = undefined;

    const testError = new Error("Test error from progress handler");
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Set up a handler to catch the thrown error
    let errorThrown = false;
    const originalUnhandledRejection = process.listeners('unhandledRejection').length;
    process.on('unhandledRejection', (error) => {
      if (error === testError) {
        errorThrown = true;
        // Clean up
        process.removeAllListeners('unhandledRejection');
        if (originalUnhandledRejection > 0) {
          process.on('unhandledRejection', (...args) => {
            // Restore original handlers
            process.listeners('unhandledRejection').forEach((handler, i) => {
              if (i < originalUnhandledRejection) {
                process.on('unhandledRejection', handler);
              }
            });
          });
        }
        Q.onerror = originalOnerror;
        done();
      }
    });

    promise.then(
      () => {},
      () => {},
      () => {
        throw testError;
      }
    );

    // Trigger progress notification
    deferred.notify("progress");

    // If error wasn't thrown after some time, fail the test
    setTimeout(() => {
      process.removeAllListeners('unhandledRejection');
      if (originalUnhandledRejection > 0) {
        // Restore original handlers
        const originalHandlers = process.listeners('unhandledRejection').slice(0, originalUnhandledRejection);
        process.removeAllListeners('unhandledRejection');
        originalHandlers.forEach(handler => {
          process.on('unhandledRejection', handler);
        });
      }
      Q.onerror = originalOnerror;
      if (!errorThrown) {
        done(new Error("Error was not thrown from progress handler"));
      }
    }, 50);
  });
});