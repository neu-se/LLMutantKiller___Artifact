import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections after being called", async () => {
    // Reset state first
    Q.resetUnhandledRejections();
    
    // Stop tracking
    Q.stopUnhandledRejectionTracking();
    
    // Create a rejected promise that would normally be tracked
    Q.reject(new Error("this should not be tracked"));
    
    // Wait a tick for async processing
    await new Promise<void>((resolve) => {
      Q.nextTick(resolve);
    });
    
    // After stopping tracking, unhandled reasons should remain empty
    const reasons = Q.getUnhandledReasons();
    
    // Original: stopUnhandledRejectionTracking sets trackUnhandledRejections = false,
    // so new rejections are NOT tracked -> reasons.length === 0
    // Mutated: sets trackUnhandledRejections = true (no change), so rejections ARE tracked -> reasons.length > 0
    expect(reasons.length).toBe(0);
  });
});