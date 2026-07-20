const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when tracking is enabled", (done) => {
    // Enable tracking explicitly
    Q.resetUnhandledRejections();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      // With original code, this should track the rejection
      // With mutated code (if (true)), tracking is always disabled
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons[0]).toContain("Test error");
      done();
    }, 50);
  });
});