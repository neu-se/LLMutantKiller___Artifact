import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections after stopUnhandledRejectionTracking is called", () => {
    // Reset state first
    Q.resetUnhandledRejections();

    // Reject something before stopping - this should be tracked
    Q.reject("before stopping");
    expect(Q.getUnhandledReasons()).toEqual(["(no stack) before stopping"]);

    // Stop tracking
    Q.stopUnhandledRejectionTracking();

    // Reject something after stopping - this should NOT be tracked
    Q.reject("after stopping");

    // In the original code, trackRejection returns early when trackUnhandledRejections is false,
    // so the unhandled reasons array should remain empty (resetUnhandledRejections was called by stopUnhandledRejectionTracking).
    // In the mutated code, the early return is removed, so "after stopping" would be added.
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});