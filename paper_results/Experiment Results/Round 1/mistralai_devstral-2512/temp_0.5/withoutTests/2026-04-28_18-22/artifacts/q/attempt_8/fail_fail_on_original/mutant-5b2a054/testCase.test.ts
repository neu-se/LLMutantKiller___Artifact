const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Track if error was re-thrown in setTimeout
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

    // Create a promise chain that throws an error in a then handler
    // without a catch handler to trigger the browser error re-throw
    Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    // Check after async cycle
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (errorReThrown) {
        done();
      } else {
        done(new Error("Expected error to be re-thrown in setTimeout"));
      }
    }, 20);
  });
});