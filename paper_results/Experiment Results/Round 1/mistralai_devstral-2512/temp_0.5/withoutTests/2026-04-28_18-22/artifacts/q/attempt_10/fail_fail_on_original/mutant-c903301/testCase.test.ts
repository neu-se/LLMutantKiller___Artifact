const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler error propagation", () => {
  it("should throw errors from progress handlers when no error handler is present", (done) => {
    // Store original handlers
    const originalOnerror = Q.onerror;
    Q.onerror = undefined;

    // Track if error was thrown
    let errorThrown = false;

    // Override the default error throwing mechanism in browsers
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: Function, delay: number) => {
      if (delay === 0) {
        const originalFn = fn;
        return originalSetTimeout(() => {
          try {
            originalFn();
          } catch (e) {
            errorThrown = true;
            cleanup();
            done();
            throw e;
          }
        }, 0);
      }
      return originalSetTimeout(fn, delay);
    };

    // Create a promise with a progress handler that throws
    const deferred = Q.defer();
    const testError = new Error("Progress handler error");

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
      (global as any).setTimeout = originalSetTimeout;
      Q.onerror = originalOnerror;
    }

    // Timeout to fail test if error isn't thrown
    setTimeout(() => {
      cleanup();
      if (!errorThrown) {
        done(new Error("Error was not propagated from progress handler"));
      }
    }, 100);
  });
});