import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking behavior", () => {
  it("should stop tracking unhandled rejections after being called", () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    // Create an unhandled rejection before stopping tracking
    Q.reject(new Error("First error"));

    // Stop tracking unhandled rejections
    Q.stopUnhandledRejectionTracking();

    // Create another unhandled rejection after stopping tracking
    Q.reject(new Error("Second error"));

    // Only the first error should be tracked
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(1);
    expect(unhandledReasons[0]).toContain("First error");
  });
});