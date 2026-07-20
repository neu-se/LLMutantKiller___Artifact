import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking after stopUnhandledRejectionTracking", () => {
  it("should not track rejections after stopUnhandledRejectionTracking is called", () => {
    Q.resetUnhandledRejections();
    
    // Stop tracking
    Q.stopUnhandledRejectionTracking();
    
    // Create a rejection after tracking has been stopped
    Q.reject("reason after stop");
    
    // In the original code, trackRejection returns early when trackUnhandledRejections is false,
    // so the rejection should NOT be added to unhandledReasons.
    // In the mutated code, the early return is missing, so the rejection WILL be added.
    expect(Q.getUnhandledReasons()).toEqual([]);
    
    // Reset for cleanup
    Q.resetUnhandledRejections();
  });
});