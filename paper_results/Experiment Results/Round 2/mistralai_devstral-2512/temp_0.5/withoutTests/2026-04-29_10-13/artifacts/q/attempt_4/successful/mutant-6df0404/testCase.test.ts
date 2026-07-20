const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should actually stop tracking unhandled rejections when called", () => {
    // Store the original unhandled rejection tracking state
    const originalTracking = Q.getUnhandledReasons().length;

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Call stopUnhandledRejectionTracking
    Q.stopUnhandledRejectionTracking();

    // Create another rejected promise after stopping tracking
    const rejectedPromise2 = Q.reject(new Error("Test error 2"));

    // Force a tick to ensure any tracking logic has run
    return Q.delay(10).then(() => {
      const newTracking = Q.getUnhandledReasons().length;

      // In the original code, tracking should be stopped so no new rejections should be tracked
      // In the mutated code, tracking continues so new rejections should be tracked
      expect(newTracking).toBe(originalTracking);
    });
  });
});