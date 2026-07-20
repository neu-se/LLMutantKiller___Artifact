const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not clear unhandled rejections when tracking is disabled", () => {
    // Add unhandled rejections
    Q.reject("reason1");
    Q.reject("reason2");

    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Manually call resetUnhandledRejections (which should do nothing when tracking is disabled)
    Q.resetUnhandledRejections();

    // In original code: rejections should remain since tracking is disabled
    // In mutated code: rejections would be cleared due to inverted condition
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(2);
    expect(reasons[0]).toContain("reason1");
    expect(reasons[1]).toContain("reason2");
  });
});