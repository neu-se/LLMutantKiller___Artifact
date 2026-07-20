const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not modify internal state when tracking is disabled", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Get reference to internal arrays
    const reasons = Q.getUnhandledReasons();

    // Add test data
    reasons.push("test-reason");

    // Store original state
    const originalState = {
      length: reasons.length,
      content: [...reasons]
    };

    // Call reset while tracking is disabled
    Q.resetUnhandledRejections();

    // In original code: state should be unchanged
    // In mutated code: state would be modified
    expect(reasons.length).toBe(originalState.length);
    expect(reasons).toEqual(originalState.content);

    // Additional check: verify the array reference is still the same
    expect(Q.getUnhandledReasons()).toBe(reasons);
  });
});