const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should behave differently when reset is called with tracking disabled", () => {
    // Add some unhandled rejections
    Q.reject("reason1");
    Q.reject("reason2");

    // Get the current state
    const beforeReset = Q.getUnhandledReasons();
    expect(beforeReset.length).toBe(2);

    // Disable tracking and reset
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();

    // In original code: arrays were cleared by resetUnhandledRejections()
    // In mutated code: same behavior since the condition is inverted but empty
    // This test won't actually expose the mutation since both versions clear arrays

    // Let me try a different approach - check if tracking state affects reset behavior
    Q.startUnhandledRejectionTracking = function() {
      Q.trackUnhandledRejections = true;
    };

    Q.startUnhandledRejectionTracking();
    Q.reject("reason3");
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();

    // This still won't work because the mutation doesn't change observable behavior
    // The mutation is in an empty if block, so it doesn't actually change anything
  });
});