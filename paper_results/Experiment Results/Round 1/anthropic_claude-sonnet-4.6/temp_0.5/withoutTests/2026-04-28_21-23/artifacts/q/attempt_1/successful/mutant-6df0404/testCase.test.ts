import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections after being called", (done) => {
    // Reset state first
    Q.resetUnhandledRejections();
    
    // Verify tracking is initially active
    const initialReasons = Q.getUnhandledReasons();
    expect(initialReasons.length).toBe(0);
    
    // Stop tracking
    Q.stopUnhandledRejectionTracking();
    
    // Create a rejected promise - this should NOT be tracked after stopping
    const rejectedPromise = Q.reject(new Error("test error after stop"));
    
    // Give the async tracking a chance to run
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      // After stopping tracking, no new unhandled rejections should be recorded
      expect(reasons.length).toBe(0);
      
      // Cleanup: reset for other tests
      Q.resetUnhandledRejections();
      done();
    }, 100);
  });
});