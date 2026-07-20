import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection respects trackUnhandledRejections flag", () => {
  it("should not track rejections after stopUnhandledRejectionTracking is called", async () => {
    // Stop tracking unhandled rejections
    Q.stopUnhandledRejectionTracking();
    
    // Create a rejected promise - in original code, this should NOT be tracked
    // because trackUnhandledRejections is now false and trackRejection returns early
    // In mutated code, `if (false)` never triggers, so it still tracks
    const rejectedPromise = Q.reject(new Error("test rejection after stop"));
    
    // Handle the rejection to avoid unhandled rejection warnings
    rejectedPromise.catch(() => {});
    
    // Wait for async operations to settle
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // In original: getUnhandledReasons returns empty (tracking was stopped)
    // In mutated: getUnhandledReasons returns non-empty (tracking continued despite stop)
    const reasons = Q.getUnhandledReasons();
    
    expect(reasons.length).toBe(0);
  });
});