const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should maintain unhandled rejections after stopping tracking", () => {
    // Add unhandled rejections while tracking is enabled
    Q.reject("reason1");
    Q.reject("reason2");

    // Stop tracking
    Q.stopUnhandledRejectionTracking();

    // Verify rejections are still present (original behavior)
    // In mutated code, they would be cleared due to inverted condition
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});