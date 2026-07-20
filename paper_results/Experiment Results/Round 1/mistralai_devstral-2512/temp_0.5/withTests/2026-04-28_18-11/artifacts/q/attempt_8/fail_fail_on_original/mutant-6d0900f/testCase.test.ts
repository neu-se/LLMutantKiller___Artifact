import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejections by default and allow disabling", () => {
    // Reset and verify initial state
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons().length).toBe(0);

    // First rejection should be tracked
    Q.reject("first rejection");
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Stop tracking and verify second rejection isn't tracked
    Q.stopUnhandledRejectionTracking();
    Q.reject("second rejection");
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});