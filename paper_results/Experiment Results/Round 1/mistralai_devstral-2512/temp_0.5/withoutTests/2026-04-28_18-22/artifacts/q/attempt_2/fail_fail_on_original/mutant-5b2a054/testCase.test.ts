import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // This test simulates the browser environment behavior where uncaught exceptions
    // in promise handlers should be re-thrown asynchronously to avoid slow-downs
    let errorThrown = false;

    // Override setTimeout to catch the re-thrown error
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: Function, delay: number) => {
      try {
        fn();
      } catch (e) {
        errorThrown = true;
        // Restore original setTimeout for cleanup
        (global as any).setTimeout = originalSetTimeout;
        done();
      }
      return 0 as any;
    };

    // Create a rejected promise and don't handle the rejection
    // This should trigger the error re-throwing mechanism
    const promise = Q.reject(new Error("Test error"));

    // Give time for the async error handling to occur
    setTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      if (!errorThrown) {
        done(new Error("Expected error to be re-thrown asynchronously"));
      }
    }, 10);
  });
});