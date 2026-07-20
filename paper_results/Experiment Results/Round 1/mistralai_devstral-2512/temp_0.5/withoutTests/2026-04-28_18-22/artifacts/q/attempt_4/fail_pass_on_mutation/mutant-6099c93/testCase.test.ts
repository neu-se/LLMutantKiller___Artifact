const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track and untrack unhandled rejections properly", (done) => {
    // Track initial state
    const initialUnhandled = Q.getUnhandledReasons().length;

    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Give time for the rejection to be tracked
    setTimeout(() => {
      // Check that the rejection was tracked
      const afterRejection = Q.getUnhandledReasons().length;
      expect(afterRejection).toBeGreaterThan(initialUnhandled);

      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Give time for the rejection to be untracked
        setTimeout(() => {
          // Check that the rejection was untracked
          const afterHandling = Q.getUnhandledReasons().length;
          expect(afterHandling).toBeLessThan(afterRejection);
          done();
        }, 50);
      });
    }, 50);
  });
});