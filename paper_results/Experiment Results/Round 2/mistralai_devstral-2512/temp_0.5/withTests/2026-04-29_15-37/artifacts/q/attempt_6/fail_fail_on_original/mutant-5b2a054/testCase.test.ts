// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in nextTick", () => {
  it("should re-throw errors in browsers when uncaught in promise handlers", (done) => {
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
          (global as any).setTimeout = originalSetTimeout;
          done();
          return;
        }
      }
      return originalSetTimeout(fn, delay);
    };

    // Create a scenario that directly triggers the error handling in nextTick
    // by simulating what happens when a task throws an error in a browser
    Q.nextTick(() => {
      throw error;
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