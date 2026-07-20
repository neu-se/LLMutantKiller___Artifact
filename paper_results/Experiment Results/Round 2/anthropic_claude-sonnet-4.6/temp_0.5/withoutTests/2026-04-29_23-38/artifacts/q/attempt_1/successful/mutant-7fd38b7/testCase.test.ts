import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections re-enables tracking", () => {
  it("should re-enable unhandled rejection tracking after stopUnhandledRejectionTracking is called", async () => {
    // Stop tracking - this sets trackUnhandledRejections to false
    Q.stopUnhandledRejectionTracking();

    // Verify tracking is stopped - rejected promise should not be tracked
    const ignoredRejection = Q.reject(new Error("ignored error"));
    // Give it a tick to process
    await new Promise(resolve => setImmediate(resolve));
    
    // Now reset - in original code this should re-enable tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise - should be tracked if resetUnhandledRejections re-enabled tracking
    const testError = new Error("test error for tracking");
    const rejectedPromise = Q.reject(testError);

    // Give the async tracking a chance to run
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));

    const reasons = Q.getUnhandledReasons();

    // In original code: trackUnhandledRejections is re-enabled, so rejection is tracked
    // In mutated code: trackUnhandledRejections remains false, so rejection is NOT tracked
    expect(reasons.length).toBeGreaterThan(0);

    // Clean up
    Q.resetUnhandledRejections();
  });
});