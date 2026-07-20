const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly identify and track unhandled rejections", (done) => {
    // Reset tracking to ensure clean state
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Give time for the promise to be tracked
    setTimeout(() => {
      // Verify it's being tracked
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);
      expect(reasons[0]).toContain("test error");

      // Now handle the promise
      rejectedPromise.catch(() => {
        setTimeout(() => {
          // After handling, should be removed from tracking
          const afterHandling = Q.getUnhandledReasons();
          expect(afterHandling.length).toBe(0);
          done();
        }, 10);
      });
    }, 10);
  });
});