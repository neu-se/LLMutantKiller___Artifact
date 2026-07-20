import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections so that new rejections are not recorded", () => {
    // Reset state first to start clean
    Q.resetUnhandledRejections();

    // Stop tracking
    Q.stopUnhandledRejectionTracking();

    // Reject a promise after stopping - this should NOT be tracked
    Q.reject("should not be tracked");

    // With the original code, trackUnhandledRejections is false after stop, so nothing is added
    // With the mutated code, trackUnhandledRejections is true after stop, so the reason would be tracked
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});