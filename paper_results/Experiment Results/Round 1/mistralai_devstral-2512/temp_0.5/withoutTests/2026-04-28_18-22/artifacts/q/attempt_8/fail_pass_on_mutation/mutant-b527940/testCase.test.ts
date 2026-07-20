const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly track unhandled rejections in the internal array", (done) => {
    // Reset tracking to ensure clean state
    Q.resetUnhandledRejections();

    // Create multiple rejected promises
    const promise1 = Q.reject("error1");
    const promise2 = Q.reject("error2");
    const promise3 = Q.reject("error3");

    // Give time for tracking to occur
    setTimeout(() => {
      // Check internal tracking state - should have 3 entries
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(3);

      // Handle first promise
      promise1.catch(() => {
        setTimeout(() => {
          // After handling one, should have 2 remaining
          const afterFirst = Q.getUnhandledReasons();
          expect(afterFirst.length).toBe(2);

          // Handle second promise
          promise2.catch(() => {
            setTimeout(() => {
              // After handling second, should have 1 remaining
              const afterSecond = Q.getUnhandledReasons();
              expect(afterSecond.length).toBe(1);

              // Handle third promise
              promise3.catch(() => {
                setTimeout(() => {
                  // After handling all, should have 0 remaining
                  const final = Q.getUnhandledReasons();
                  expect(final.length).toBe(0);
                  done();
                }, 10);
              });
            }, 10);
          });
        }, 10);
      });
    }, 10);
  });
});