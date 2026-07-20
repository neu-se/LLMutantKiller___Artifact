const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should preserve unhandled rejection state when tracking is disabled and reset is called", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();

    // Create some unhandled rejections
    Q.reject(new Error("Error 1"));
    Q.reject(new Error("Error 2"));

    // Get initial state
    const initialReasons = Q.getUnhandledReasons();
    const initialLength = initialReasons.length;

    // Call reset while tracking is disabled
    Q.resetUnhandledRejections();

    // In original code: should early return without modifying the array
    // In mutated code: would incorrectly process and potentially modify the array
    const finalReasons = Q.getUnhandledReasons();
    expect(finalReasons).toBe(initialReasons);
    expect(finalReasons.length).toBe(initialLength);
  });
});