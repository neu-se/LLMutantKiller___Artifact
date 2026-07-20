const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should enable unhandled rejection tracking after reset", () => {
    // Disable tracking initially
    Q.stopUnhandledRejectionTracking();

    // Reset should re-enable tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that should be tracked
    const rejectedPromise = Q.reject(new Error("test error"));

    // Give the event loop a chance to process the rejection
    return Q.delay(10).then(() => {
      // Check if the rejection was tracked
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons[0]).toContain("test error");
    });
  });
});