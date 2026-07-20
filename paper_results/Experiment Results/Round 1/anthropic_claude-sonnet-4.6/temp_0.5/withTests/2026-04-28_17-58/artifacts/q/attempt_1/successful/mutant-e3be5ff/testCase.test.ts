import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections", () => {
  it("should restart tracking after stopUnhandledRejectionTracking has been called", () => {
    // Stop tracking unhandled rejections
    Q.stopUnhandledRejectionTracking();

    // Reset should restart tracking
    Q.resetUnhandledRejections();

    // Now reject a promise - it should be tracked since reset restarted tracking
    Q.reject("test reason after reset");

    // In the original code, tracking is restarted by resetUnhandledRejections
    // when trackUnhandledRejections is false (!trackUnhandledRejections is true)
    // In the mutated code, the restart block is skipped (trackUnhandledRejections is false,
    // so the mutated `if (trackUnhandledRejections)` block does NOT run)
    const reasons = Q.getUnhandledReasons();
    expect(reasons).toEqual(["(no stack) test reason after reset"]);

    // Cleanup
    Q.resetUnhandledRejections();
  });
});