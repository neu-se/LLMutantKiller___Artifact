const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not clear unhandled rejections when tracking is already disabled", () => {
    // First disable tracking
    Q.stopUnhandledRejectionTracking();

    // Add some unhandled rejections
    Q.reject("reason1");
    Q.reject("reason2");

    // Call resetUnhandledRejections (which should do nothing when tracking is disabled)
    Q.resetUnhandledRejections();

    // In original code: rejections should remain since tracking is disabled
    // In mutated code: rejections would be cleared due to inverted condition
    expect(Q.getUnhandledReasons().length).toBe(2);
  });
});