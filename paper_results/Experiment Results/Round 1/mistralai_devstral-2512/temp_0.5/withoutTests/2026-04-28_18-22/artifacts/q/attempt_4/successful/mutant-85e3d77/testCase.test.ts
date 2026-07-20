const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when trackUnhandledRejections is false", (done) => {
    // Disable rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the next tick to allow any potential tracking to occur
    setTimeout(() => {
      // Check that no rejections were tracked
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections.length).toBe(0);
      done();
    }, 10);
  });
});