const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Wait for the rejection to be tracked
    setTimeout(() => {
      // Verify it was tracked
      const trackedRejections = Q.getUnhandledReasons();
      expect(trackedRejections.length).toBeGreaterThan(0);

      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for untracking to occur
        setTimeout(() => {
          // Verify it was untracked
          const afterHandling = Q.getUnhandledReasons();
          expect(afterHandling.length).toBeLessThan(trackedRejections.length);
          done();
        }, 50);
      });
    }, 50);
  });
});