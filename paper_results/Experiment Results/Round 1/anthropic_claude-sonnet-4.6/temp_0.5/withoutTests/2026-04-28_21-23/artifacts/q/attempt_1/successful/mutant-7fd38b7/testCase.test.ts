import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections restores tracking", () => {
  it("should re-enable unhandled rejection tracking after stopUnhandledRejectionTracking is called and then resetUnhandledRejections is called", async () => {
    // Stop tracking (sets trackUnhandledRejections = false)
    Q.stopUnhandledRejectionTracking();

    // Reset unhandled rejections - in original code this sets trackUnhandledRejections back to true
    // In mutated code, the if block is empty so trackUnhandledRejections stays false
    Q.resetUnhandledRejections();

    // Create a rejected promise - should be tracked in original, not in mutated
    const reason = new Error("test rejection");
    Q.reject(reason);

    // Wait for async operations to complete
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    const unhandledReasons = Q.getUnhandledReasons();

    // In original: trackUnhandledRejections was restored to true, so rejection is tracked
    // In mutated: trackUnhandledRejections stays false, so rejection is NOT tracked
    expect(unhandledReasons.length).toBeGreaterThan(0);
  });
});