// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in nextTick", () => {
  it("should re-throw errors in browsers when uncaught in promises", (done) => {
    // This test verifies that errors thrown in promise handlers
    // are re-thrown asynchronously in browser environments
    const error = new Error("Test error");

    // Track if error was re-thrown
    let errorThrown = false;

    // Override setTimeout to capture the error re-throw
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: Function, delay: number) => {
      if (delay === 0) {
        try {
          fn();
        } catch (e) {
          errorThrown = true;
          expect(e).toBe(error);
          done();
          return;
        }
      }
      return originalSetTimeout(fn, delay);
    };

    // Create a promise that throws an error in a browser-like environment
    const deferred = Q.defer();
    Q.nextTick(() => {
      try {
        throw error;
      } catch (e) {
        // This simulates the browser behavior where errors are caught
        // and should be re-thrown asynchronously
      }
    });

    // Give time for the error to propagate
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (!errorThrown) {
        done(new Error("Error was not re-thrown"));
      }
    }, 100);
  });
});