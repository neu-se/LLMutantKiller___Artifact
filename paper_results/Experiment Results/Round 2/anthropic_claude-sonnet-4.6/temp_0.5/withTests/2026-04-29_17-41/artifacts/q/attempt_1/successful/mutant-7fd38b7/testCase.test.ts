import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections re-enables tracking", () => {
  it("should re-enable tracking after stopUnhandledRejectionTracking is called", () => {
    // First reset to a clean state
    Q.resetUnhandledRejections();

    // Stop tracking - this sets trackUnhandledRejections to false
    Q.stopUnhandledRejectionTracking();

    // Verify tracking is stopped
    Q.reject("should not be tracked");
    expect(Q.getUnhandledReasons()).toEqual([]);

    // Now reset - in the original code, this re-enables tracking
    // In the mutated code, it does NOT re-enable tracking
    Q.resetUnhandledRejections();

    // Create a new rejection - should be tracked in original, not in mutated
    Q.reject("should be tracked after reset");

    // In original: tracking was re-enabled, so this rejection is tracked
    // In mutated: tracking was NOT re-enabled, so this rejection is NOT tracked
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});