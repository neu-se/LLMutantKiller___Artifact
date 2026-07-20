const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Create a promise that will throw an error in its handler
    const promise = Q.resolve().then(() => {
      throw new Error("Test error");
    });

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

    // Don't attach a catch handler to trigger the error re-throw mechanism
    // The error should be re-thrown asynchronously in browser environments

    // Check after enough time for async error handling
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (errorReThrown) {
        done();
      } else {
        done(new Error("Expected error to be re-thrown asynchronously"));
      }
    }, 50);
  });
});