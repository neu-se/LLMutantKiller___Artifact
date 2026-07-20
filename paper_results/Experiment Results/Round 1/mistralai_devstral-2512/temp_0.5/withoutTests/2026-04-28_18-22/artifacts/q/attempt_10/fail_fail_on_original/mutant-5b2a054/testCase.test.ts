const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Track if error was re-thrown
    let errorReThrown = false;

    // Override setTimeout to detect error re-throwing
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: Function, delay: number) => {
      if (delay === 0) {
        const wrappedFn = () => {
          try {
            fn();
          } catch (e) {
            errorReThrown = true;
          }
        };
        return originalSetTimeout(wrappedFn, delay);
      }
      return originalSetTimeout(fn, delay);
    };

    // Create a rejected promise without handling it
    // This should trigger the async error re-throw in browser environments
    Q.reject(new Error("Test error"));

    // Check after async cycle
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