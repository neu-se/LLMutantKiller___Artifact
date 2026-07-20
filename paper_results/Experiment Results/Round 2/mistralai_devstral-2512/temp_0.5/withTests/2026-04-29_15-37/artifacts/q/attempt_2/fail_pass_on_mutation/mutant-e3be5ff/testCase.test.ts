// Test case to detect the mutation in resetUnhandledRejections function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation", () => {
  it("should not track rejections when tracking is disabled", async () => {
    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Give time for any potential tracking to occur
    await Q.delay(10);

    // Verify no rejections were tracked
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);

    // Re-enable tracking for cleanup
    Q.resetUnhandledRejections();
  });
});