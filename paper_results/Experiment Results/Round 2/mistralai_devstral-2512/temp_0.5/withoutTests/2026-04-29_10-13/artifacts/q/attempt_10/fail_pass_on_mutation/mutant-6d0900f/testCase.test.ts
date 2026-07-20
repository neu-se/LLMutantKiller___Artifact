const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track unhandled rejections when tracking is explicitly disabled", (done) => {
    // Explicitly disable tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that should not be tracked
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      // With original code: tracking is disabled, should have 0 reasons
      // With mutated code: tracking is always enabled (if true), should have 1 reason
      expect(reasons.length).toBe(0);
      done();
    }, 100);
  }, 1000);
});