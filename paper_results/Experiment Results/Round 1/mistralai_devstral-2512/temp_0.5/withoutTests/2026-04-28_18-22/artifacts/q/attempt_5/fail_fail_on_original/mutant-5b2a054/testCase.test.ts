const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Create a rejected promise without handling it
    const promise = Q.reject(new Error("Test error"));

    // Override setTimeout to detect if error is re-thrown
    const originalSetTimeout = setTimeout;
    let errorReThrown = false;

    (global as any).setTimeout = (fn: Function, delay: number) => {
      if (delay === 0) {
        try {
          fn();
        } catch (e) {
          errorReThrown = true;
        }
      }
      return originalSetTimeout(fn, delay);
    };

    // Force promise execution
    promise.then(() => {}, () => {});

    // Check after async cycle
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (errorReThrown) {
        done();
      } else {
        done(new Error("Expected error to be re-thrown asynchronously"));
      }
    }, 10);
  });
});