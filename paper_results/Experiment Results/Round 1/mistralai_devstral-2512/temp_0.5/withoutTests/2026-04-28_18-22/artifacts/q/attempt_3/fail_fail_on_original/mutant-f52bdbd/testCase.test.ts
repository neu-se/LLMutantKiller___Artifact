const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections with stack traces", (done) => {
    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBe(1);
      expect(unhandledReasons[0]).toContain("Test error");
      expect(unhandledReasons[0]).toContain("stack");
      Q.stopUnhandledRejectionTracking();
      done();
    }, 10);
  });
});