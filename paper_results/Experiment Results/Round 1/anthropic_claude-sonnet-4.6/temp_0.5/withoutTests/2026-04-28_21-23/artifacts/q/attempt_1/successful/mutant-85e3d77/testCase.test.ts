import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection with stopUnhandledRejectionTracking", () => {
  it("should not track rejections after stopUnhandledRejectionTracking is called", () => {
    // Stop tracking unhandled rejections
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise - should NOT be tracked since tracking is disabled
    Q.reject(new Error("test rejection after tracking stopped"));

    // In the original code, trackRejection returns early when !trackUnhandledRejections
    // In the mutated code, it continues and adds to unhandledReasons
    const reasons = Q.getUnhandledReasons();

    // Should be empty because tracking was stopped before the rejection was created
    expect(reasons.length).toBe(0);

    // Re-enable tracking for cleanup
    Q.resetUnhandledRejections();
  });
});