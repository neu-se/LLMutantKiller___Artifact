const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections when called", () => {
    // Reset unhandled rejections before test
    Q.resetUnhandledRejections();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Call stopUnhandledRejectionTracking
    Q.stopUnhandledRejectionTracking();

    // Create another rejected promise after stopping tracking
    const rejectedPromise2 = Q.reject(new Error("Test error 2"));

    // Give some time for the unhandled rejection to be processed
    return Q.delay(10).then(() => {
      // In the original code, tracking should be stopped so no unhandled rejections should be tracked
      // In the mutated code, tracking continues so unhandled rejections would still be tracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});