const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event for tracked promises", (done) => {
    // Reset tracking to ensure clean state
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Give time for the promise to be tracked
    setTimeout(() => {
      // Verify it's being tracked
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);

      // Now set up event listener
      const listener = (reason: any, promise: any) => {
        process.removeListener("unhandledRejection", listener);
        expect(reason).toBe("test error");
        expect(promise).toBe(rejectedPromise);
        done();
      };

      process.on("unhandledRejection", listener);

      // Force emission by checking tracking state
      Q.getUnhandledReasons();

      // Timeout to fail test if event not emitted
      setTimeout(() => {
        process.removeListener("unhandledRejection", listener);
        done(new Error("Event not emitted"));
      }, 50);
    }, 10);
  });
});