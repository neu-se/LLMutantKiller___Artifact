const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections and emit events correctly", (done) => {
    // Reset any previous unhandled rejections
    Q.resetUnhandledRejections();

    // Create a rejected promise without a handler
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Check that the rejection was tracked
    setTimeout(() => {
      const unhandled = Q.getUnhandledReasons();
      expect(unhandled.length).toBe(1);
      expect(unhandled[0]).toContain("Test rejection");

      // Now handle the rejection
      rejectedPromise.catch(() => {
        // After handling, check it was untracked
        setTimeout(() => {
          const newUnhandled = Q.getUnhandledReasons();
          expect(newUnhandled.length).toBe(0);
          done();
        }, 10);
      });
    }, 10);
  });
});