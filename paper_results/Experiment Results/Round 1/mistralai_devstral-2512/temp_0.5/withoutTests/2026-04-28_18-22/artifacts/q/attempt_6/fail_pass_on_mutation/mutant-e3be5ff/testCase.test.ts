const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not modify unhandled reasons array when tracking is disabled", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Get reference to the internal array
    const reasonsArray = Q.getUnhandledReasons();

    // Add some test data
    reasonsArray.push("test1", "test2");

    // Call reset while tracking is disabled
    Q.resetUnhandledRejections();

    // In original code: array should remain unchanged (length = 2)
    // In mutated code: array would be cleared (length = 0)
    expect(reasonsArray).toHaveLength(2);
    expect(reasonsArray).toContain("test1");
    expect(reasonsArray).toContain("test2");
  });
});