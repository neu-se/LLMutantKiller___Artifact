const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly disable unhandled rejection tracking when stopUnhandledRejectionTracking is called", (done) => {
    // First enable tracking and create a rejection
    Q.resetUnhandledRejections();
    const promise1 = Q.reject(new Error("First error"));

    setTimeout(() => {
      // Verify first rejection was tracked
      let reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBeGreaterThan(0);

      // Now disable tracking
      Q.stopUnhandledRejectionTracking();

      // Create another rejection that should NOT be tracked
      const promise2 = Q.reject(new Error("Second error"));

      setTimeout(() => {
        // Check that only the first rejection was tracked
        reasons = Q.getUnhandledReasons();
        // Original code: should still be 1 (second rejection not tracked)
        // Mutated code: will be 2 (both tracked despite stopUnhandledRejectionTracking)
        expect(reasons.length).toBe(1);
        done();
      }, 50);
    }, 50);
  });
});