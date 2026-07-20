const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should stop tracking unhandled rejections when tracking is disabled", () => {
    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that should not be tracked
    Q.reject("test reason");

    // Verify that no unhandled rejections are being tracked
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});