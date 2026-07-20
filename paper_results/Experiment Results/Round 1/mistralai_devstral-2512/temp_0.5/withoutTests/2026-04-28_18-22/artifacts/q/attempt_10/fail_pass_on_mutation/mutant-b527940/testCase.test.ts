const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly track multiple unhandled rejections", (done) => {
    // Reset tracking to ensure clean state
    Q.resetUnhandledRejections();

    // Create multiple rejected promises
    const promises = [
      Q.reject("error1"),
      Q.reject("error2"),
      Q.reject("error3"),
      Q.reject("error4"),
      Q.reject("error5")
    ];

    // Give time for tracking to occur
    setTimeout(() => {
      // Check internal tracking state - should have 5 entries
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(5);

      // Handle first three promises
      promises[0].catch(() => {});
      promises[1].catch(() => {});
      promises[2].catch(() => {});

      setTimeout(() => {
        // After handling three, should have 2 remaining
        const afterHandling = Q.getUnhandledReasons();
        expect(afterHandling.length).toBe(2);

        // Handle remaining two
        promises[3].catch(() => {});
        promises[4].catch(() => {});

        setTimeout(() => {
          // After handling all, should have 0 remaining
          const final = Q.getUnhandledReasons();
          expect(final.length).toBe(0);
          done();
        }, 10);
      }, 10);
    }, 10);
  });
});