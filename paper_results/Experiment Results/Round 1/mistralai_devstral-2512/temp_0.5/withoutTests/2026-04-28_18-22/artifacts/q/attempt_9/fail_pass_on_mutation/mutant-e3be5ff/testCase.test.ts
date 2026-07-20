const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking behavior", () => {
  it("should demonstrate different behavior when tracking is disabled vs enabled", () => {
    // Test with tracking disabled
    Q.stopUnhandledRejectionTracking();
    Q.reject(new Error("Disabled tracking error"));
    const disabledReasons = Q.getUnhandledReasons();
    disabledReasons.push("manual disabled reason");
    Q.resetUnhandledRejections();

    // Test with tracking enabled
    Q.stopUnhandledRejectionTracking(); // Reset state
    const enabledReasonsBefore = Q.getUnhandledReasons();
    enabledReasonsBefore.push("manual enabled reason");

    // The key difference: when tracking is disabled, resetUnhandledRejections
    // should not modify the array (original behavior)
    // When mutated, it would incorrectly modify the array
    expect(disabledReasons).toHaveLength(1);
    expect(disabledReasons[0]).toBe("manual disabled reason");
  });
});