import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections tracking restart behavior", () => {
  it("should restart unhandled rejection tracking after stopUnhandledRejectionTracking when resetUnhandledRejections is called", async () => {
    // Stop tracking first
    Q.stopUnhandledRejectionTracking();
    
    // Reset should restart tracking in original code (if !trackUnhandledRejections -> set true)
    // In mutated code (if trackUnhandledRejections -> won't execute since it's false)
    Q.resetUnhandledRejections();
    
    // Now create a rejected promise - if tracking was restarted, it should appear in unhandledReasons
    const reason = new Error("test rejection for tracking");
    Q.reject(reason);
    
    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const reasons = Q.getUnhandledReasons();
    
    // In original: tracking was restarted by resetUnhandledRejections, so rejection is tracked
    // In mutated: tracking was NOT restarted, so rejection is NOT tracked
    expect(reasons.length).toBeGreaterThan(0);
  });
});