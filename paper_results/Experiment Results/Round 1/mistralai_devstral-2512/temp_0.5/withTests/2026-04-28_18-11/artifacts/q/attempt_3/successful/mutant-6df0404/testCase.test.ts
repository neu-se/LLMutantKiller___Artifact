import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking behavior", () => {
  it("should stop tracking unhandled rejections after being called", () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    // Stop tracking unhandled rejections immediately
    Q.stopUnhandledRejectionTracking();

    // Create unhandled rejections after stopping tracking
    Q.reject(new Error("First error"));
    Q.reject(new Error("Second error"));

    // No errors should be tracked since tracking was stopped
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});