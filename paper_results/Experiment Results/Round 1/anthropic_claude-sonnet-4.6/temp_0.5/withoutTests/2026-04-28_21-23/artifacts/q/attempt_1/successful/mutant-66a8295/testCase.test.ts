import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections after stopUnhandledRejectionTracking is called", async () => {
    // Reset state first
    Q.resetUnhandledRejections();
    
    // Stop tracking
    Q.stopUnhandledRejectionTracking();
    
    // Create a rejected promise - this should NOT be tracked since we stopped tracking
    const error = new Error("test rejection after tracking stopped");
    Q.reject(error);
    
    // Wait for async operations to settle
    await new Promise<void>((resolve) => {
      Q.nextTick(resolve);
    });
    
    // In the original code, after stopUnhandledRejectionTracking(), 
    // trackRejection returns early (due to !trackUnhandledRejections check),
    // so unhandledReasons should be empty.
    // In the mutated code, `if (false)` never triggers the return,
    // so the rejection IS tracked and unhandledReasons would be non-empty.
    const reasons = Q.getUnhandledReasons();
    
    expect(reasons).toHaveLength(0);
  });
});