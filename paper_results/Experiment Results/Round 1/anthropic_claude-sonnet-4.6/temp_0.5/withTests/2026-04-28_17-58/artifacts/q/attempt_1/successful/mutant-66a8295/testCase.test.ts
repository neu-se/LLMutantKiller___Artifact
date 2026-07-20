import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection respects trackUnhandledRejections flag", () => {
  it("should not track new rejections after stopUnhandledRejectionTracking is called", () => {
    // Reset to a clean state first
    Q.resetUnhandledRejections();
    
    // Stop tracking - this sets trackUnhandledRejections to false
    Q.stopUnhandledRejectionTracking();
    
    // Create a new rejection - this should NOT be tracked
    Q.reject(new Error("should not be tracked"));
    
    // With the original code, trackRejection returns early when trackUnhandledRejections is false
    // With the mutated code (if (false) instead of if (!trackUnhandledRejections)),
    // the early return never fires, so the rejection gets tracked anyway
    const reasons = Q.getUnhandledReasons();
    
    expect(reasons.length).toBe(0);
  });
});