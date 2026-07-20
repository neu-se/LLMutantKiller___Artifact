import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", (done) => {
    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that should not be tracked
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give some time for the tracking to potentially occur
    setTimeout(() => {
      // Verify that no unhandled rejections were tracked
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBe(0);
      done();
    }, 10);
  });
});