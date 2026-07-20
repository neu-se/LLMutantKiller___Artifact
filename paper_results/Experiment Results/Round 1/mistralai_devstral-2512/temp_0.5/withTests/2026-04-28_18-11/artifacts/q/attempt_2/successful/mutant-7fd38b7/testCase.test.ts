import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should enable tracking when resetUnhandledRejections is called", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).toEqual([]);

    // Call resetUnhandledRejections to re-enable tracking
    Q.resetUnhandledRejections();

    // Create an unhandled rejection
    Q.reject("test reason");

    // The rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});