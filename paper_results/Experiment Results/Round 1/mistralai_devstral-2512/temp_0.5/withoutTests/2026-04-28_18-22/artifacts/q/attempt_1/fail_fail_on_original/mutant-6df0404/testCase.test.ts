import { Q } from "./q";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections when called", () => {
    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Call stopUnhandledRejectionTracking
    Q.stopUnhandledRejectionTracking();

    // Give some time for the unhandled rejection to be processed
    return Q.delay(10).then(() => {
      // If tracking is stopped, the unhandled rejection should not be tracked
      // In the mutated version, tracking continues, which would cause the test to fail
      // as the unhandled rejection would still be tracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});