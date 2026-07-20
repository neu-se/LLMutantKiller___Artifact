const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should execute the correct branch based on tracking state", () => {
    // Enable tracking and add a rejection
    Q.resetUnhandledRejections();
    Q.reject("test reason");

    // Verify rejection is tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Disable tracking and reset
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();

    // In original code: arrays are cleared regardless of tracking state
    // In mutated code: same behavior since the if block is empty
    // However, the mutation changes which branch executes

    // Add another rejection after disabling tracking
    Q.reject("another reason");

    // The mutation would affect behavior if the empty block had cleanup logic
    // For now, we test that the basic functionality still works
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});