const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly reset unhandled rejections when tracking is disabled", () => {
    // First enable tracking and create some unhandled rejections
    Q.stopUnhandledRejectionTracking();
    Q.reject(new Error("Test error 1"));
    Q.reject(new Error("Test error 2"));

    // Manually add some reasons to the internal tracking array
    // This simulates the state where tracking was previously enabled
    Q.getUnhandledReasons().push("Manual reason 1", "Manual reason 2");

    // Now reset while tracking is disabled
    Q.resetUnhandledRejections();

    // In the original code, resetUnhandledRejections should early return
    // when tracking is disabled, leaving the array unchanged
    // In the mutated code, it would incorrectly clear the array
    expect(Q.getUnhandledReasons()).toHaveLength(2);
  });
});