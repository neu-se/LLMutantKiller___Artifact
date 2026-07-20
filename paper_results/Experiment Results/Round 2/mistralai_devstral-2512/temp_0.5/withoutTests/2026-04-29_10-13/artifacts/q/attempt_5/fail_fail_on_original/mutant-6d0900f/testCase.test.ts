const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when tracking is enabled and not track when disabled", (done) => {
    // Test with tracking enabled
    Q.resetUnhandledRejections();
    const rejectedPromise1 = Q.reject(new Error("Test error 1"));

    setTimeout(() => {
      let reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons[0]).toContain("Test error 1");

      // Now disable tracking and create another rejection
      Q.stopUnhandledRejectionTracking();
      const rejectedPromise2 = Q.reject(new Error("Test error 2"));

      setTimeout(() => {
        reasons = Q.getUnhandledReasons();
        // Should still only have the first error since tracking was disabled
        expect(reasons.length).toBe(1);
        done();
      }, 10);
    }, 10);
  });
});