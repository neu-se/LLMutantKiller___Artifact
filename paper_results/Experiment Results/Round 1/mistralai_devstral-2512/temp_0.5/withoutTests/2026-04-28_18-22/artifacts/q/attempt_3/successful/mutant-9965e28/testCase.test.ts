const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q rejection tracking", () => {
  it("should track unhandled rejections with stack traces", (done) => {
    // Create a rejection with a stack trace
    const error = new Error("Test error");
    const rejectedPromise = Q.reject(error);

    // Give the event loop time to process the rejection tracking
    setTimeout(() => {
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBe(1);
      expect(unhandledReasons[0]).toContain(error.stack!);
      Q.resetUnhandledRejections();
      done();
    }, 10);
  });
});