import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
  it("should stop tracking unhandled rejections after being called", () => {
    // Reset state first
    Q.resetUnhandledRejections();

    // Reject a promise before stopping tracking - this should be tracked
    Q.reject("before stop");
    expect(Q.getUnhandledReasons()).toEqual(["(no stack) before stop"]);

    // Stop tracking
    Q.stopUnhandledRejectionTracking();

    // Reset so we start fresh
    Q.resetUnhandledRejections();

    // Reject a promise after stopping - this should NOT be tracked
    Q.reject("after stop");

    // With the original code, trackUnhandledRejections is false, so nothing is added
    // With the mutated code, trackUnhandledRejections is true, so "after stop" would be tracked
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});