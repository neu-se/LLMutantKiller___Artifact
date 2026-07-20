const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not clear unhandled rejections when tracking is disabled", () => {
    // Add some unhandled rejections first
    Q.reject("reason1");
    Q.reject("reason2");

    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // The unhandled rejections should still be present in the original code
    // but cleared in the mutated code due to the inverted condition
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});