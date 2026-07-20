const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly track and report unhandled rejections", (done) => {
    // Create multiple rejected promises
    const promise1 = Q.reject("error1");
    const promise2 = Q.reject("error2");
    const promise3 = Q.reject("error3");

    // Give time for tracking to occur
    setTimeout(() => {
      // Check internal tracking state
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(3);

      // Handle one promise
      promise1.catch(() => {
        setTimeout(() => {
          const afterFirst = Q.getUnhandledReasons();
          expect(afterFirst.length).toBe(2);

          // Handle another promise
          promise2.catch(() => {
            setTimeout(() => {
              const afterSecond = Q.getUnhandledReasons();
              expect(afterSecond.length).toBe(1);

              // Handle last promise
              promise3.catch(() => {
                setTimeout(() => {
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