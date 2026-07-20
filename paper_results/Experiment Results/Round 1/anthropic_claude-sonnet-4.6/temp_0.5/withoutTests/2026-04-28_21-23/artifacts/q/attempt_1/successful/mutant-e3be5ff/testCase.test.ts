import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections restarts tracking after stopUnhandledRejectionTracking", () => {
  it("should restart unhandled rejection tracking after calling resetUnhandledRejections following stopUnhandledRejectionTracking", async () => {
    // Stop tracking - this sets trackUnhandledRejections to false
    Q.stopUnhandledRejectionTracking();
    
    // At this point, unhandled rejections should not be tracked
    const rejectedPromise = Q.reject(new Error("test error 1"));
    
    // Wait a tick for async operations
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // No unhandled reasons should be tracked since we stopped tracking
    expect(Q.getUnhandledReasons()).toHaveLength(0);
    
    // Now call resetUnhandledRejections - in the original code, this should
    // restart tracking (because !trackUnhandledRejections is true when tracking is stopped)
    // In the mutated code, this will NOT restart tracking
    Q.resetUnhandledRejections();
    
    // Create another rejected promise - should be tracked in original, not in mutated
    const rejectedPromise2 = Q.reject(new Error("test error 2"));
    
    // Wait for async tracking to occur
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // In the original code, tracking should have been restarted, so this rejection should be tracked
    // In the mutated code, tracking was NOT restarted, so this should still be empty
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBeGreaterThan(0);
    
    // Clean up
    Q.resetUnhandledRejections();
  });
});