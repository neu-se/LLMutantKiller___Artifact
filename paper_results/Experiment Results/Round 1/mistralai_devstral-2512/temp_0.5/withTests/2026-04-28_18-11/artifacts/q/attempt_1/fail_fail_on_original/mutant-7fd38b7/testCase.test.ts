import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should enable tracking when trackUnhandledRejections is false", () => {
    // Disable tracking
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).toEqual([]);

    // Create an unhandled rejection
    Q.reject("test reason");

    // Re-enable tracking
    Q.resetUnhandledRejections();

    // Create another unhandled rejection
    Q.reject("another reason");

    // The second rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});