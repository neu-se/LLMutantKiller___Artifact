const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly track unhandled rejections in the internal array", (done) => {
    // Create a rejected promise without handler
    const rejectedPromise = Q.reject("test rejection");

    // Give time for the rejection to be tracked
    setTimeout(() => {
      // Access internal tracking (this is testing implementation behavior)
      const internalState = Q.getUnhandledReasons();
      expect(internalState.length).toBeGreaterThan(0);
      expect(internalState[0]).toContain("test rejection");

      // Now handle the rejection to clean up
      rejectedPromise.catch(() => {
        // Verify it's been removed from tracking
        setTimeout(() => {
          const afterHandling = Q.getUnhandledReasons();
          expect(afterHandling.length).toBe(0);
          done();
        }, 10);
      });
    }, 10);
  });
});