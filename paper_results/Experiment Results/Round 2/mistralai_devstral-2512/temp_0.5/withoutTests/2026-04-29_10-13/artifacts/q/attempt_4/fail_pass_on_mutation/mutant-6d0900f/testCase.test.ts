const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track unhandled rejections when tracking is disabled", (done) => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(0);
      done();
    }, 10);
  });
});