// Test case to detect the mutation in resetUnhandledRejections function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation", () => {
  it("should track rejections when tracking is enabled after being disabled", async () => {
    // First disable tracking
    Q.stopUnhandledRejectionTracking();

    // Re-enable tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Give time for tracking to occur
    await Q.delay(10);

    // Verify the rejection was tracked
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBeGreaterThan(0);
  });
});