const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections with stack traces", (done) => {
    // Reset tracking before test
    Q.resetUnhandledRejections();

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBeGreaterThan(0);

      // Check if stack trace is included in the tracked reason
      const hasStackTrace = unhandledReasons.some(reason =>
        reason.includes("stack") || reason.includes("at ")
      );

      expect(hasStackTrace).toBe(true);
      Q.stopUnhandledRejectionTracking();
      done();
    }, 50);
  });
});