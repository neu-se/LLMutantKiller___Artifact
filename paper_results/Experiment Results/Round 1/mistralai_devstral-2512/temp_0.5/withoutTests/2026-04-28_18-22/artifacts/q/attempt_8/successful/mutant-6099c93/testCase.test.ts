const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly track and untrack unhandled rejections", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Wait for the rejection to be tracked
    setTimeout(() => {
      // Verify it was tracked
      const trackedRejections = Q.getUnhandledReasons();
      expect(trackedRejections.length).toBeGreaterThan(0);

      // Track if rejectionHandled event is emitted
      let rejectionHandledEmitted = false;
      const originalEmit = process.emit;
      process.emit = function(event: string, ...args: any[]) {
        if (event === "rejectionHandled") {
          rejectionHandledEmitted = true;
        }
        return (originalEmit as any).apply(this, [event, ...args]);
      };

      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for untracking to occur
        setTimeout(() => {
          process.emit = originalEmit;
          // Verify it was untracked
          const afterHandling = Q.getUnhandledReasons();
          expect(afterHandling.length).toBeLessThan(trackedRejections.length);
          // Verify rejectionHandled event was emitted
          expect(rejectionHandledEmitted).toBe(true);
          done();
        }, 50);
      });
    }, 50);
  });
});