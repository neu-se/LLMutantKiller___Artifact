import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections after being called", () => {
    // Reset state first
    Q.resetUnhandledRejections();

    // Verify tracking is active initially
    Q.reject("before stopping");
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Now reset and stop tracking
    Q.resetUnhandledRejections();
    Q.stopUnhandledRejectionTracking();

    // Any rejection after stopping should NOT be tracked
    Q.reject("after stopping");

    // With the original code, trackUnhandledRejections is false, so this rejection is not tracked
    // With the mutated code, trackUnhandledRejections is true, so this rejection IS tracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});