const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should include stack traces in unhandled rejection tracking", (done) => {
    // Reset tracking before test
    Q.resetUnhandledRejections();

    // Create an error with a stack trace
    const error = new Error("Test error with stack");
    const rejectedPromise = Q.reject(error);

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBeGreaterThan(0);

      // The mutation changes the condition from checking reason.stack to always false
      // This means stack traces won't be included in the tracked reasons
      // So we check if the tracked reason contains the actual stack trace
      const reason = unhandledReasons[0];
      expect(reason).toContain(error.stack);
      Q.stopUnhandledRejectionTracking();
      done();
    }, 50);
  });
});