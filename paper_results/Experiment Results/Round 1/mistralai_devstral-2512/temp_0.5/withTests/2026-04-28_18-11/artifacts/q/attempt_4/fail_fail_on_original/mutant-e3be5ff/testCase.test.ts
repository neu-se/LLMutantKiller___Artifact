const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should preserve unhandled rejections when tracking is stopped", () => {
    // Add an unhandled rejection
    Q.reject("test reason");

    // Stop tracking
    Q.stopUnhandledRejectionTracking();

    // Add another rejection after stopping tracking
    Q.reject("another reason");

    // In original code: first rejection should remain, second should not be tracked
    // In mutated code: both would be cleared due to inverted condition
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toContain("test reason");
  });
});