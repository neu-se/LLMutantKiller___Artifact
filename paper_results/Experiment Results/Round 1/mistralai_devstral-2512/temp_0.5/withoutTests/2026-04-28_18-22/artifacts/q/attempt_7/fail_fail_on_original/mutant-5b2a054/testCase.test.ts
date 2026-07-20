const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Track if error was re-thrown in setTimeout
    let errorReThrown = false;
    let originalError: Error | null = null;

    // Override setTimeout to detect error re-throwing
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: Function, delay: number) => {
      if (delay === 0) {
        const wrappedFn = () => {
          try {
            fn();
          } catch (e) {
            errorReThrown = true;
            originalError = e;
          }
        };
        return originalSetTimeout(wrappedFn, delay);
      }
      return originalSetTimeout(fn, delay);
    };

    // Create a promise chain that throws an error
    Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch(() => {
        // Intentionally not handling the error to trigger re-throw
      });

    // Check after async cycle
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (errorReThrown && originalError && originalError.message === "Test error") {
        done();
      } else {
        done(new Error("Expected error to be re-thrown in setTimeout with correct message"));
      }
    }, 20);
  });
});