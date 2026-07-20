const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not clear unhandled reasons when tracking is disabled", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Get the internal array reference
    const reasons = Q.getUnhandledReasons();

    // Add test data directly to the array
    reasons.push("reason1", "reason2");

    // Store original length
    const originalLength = reasons.length;

    // Call reset while tracking is disabled
    Q.resetUnhandledRejections();

    // In original code: array should remain unchanged (length stays 2)
    // In mutated code: array would be cleared (length becomes 0)
    expect(reasons.length).toBe(originalLength);
  });
});