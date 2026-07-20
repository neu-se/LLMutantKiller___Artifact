import { Q } from "./q.js";

describe("unhandled rejection tracking", () => {
  it("should enable tracking when resetUnhandledRejections is called", () => {
    // First, stop tracking to ensure we start from a clean state
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons().length).toBe(0);

    // Create an unhandled rejection
    Q.reject("test reason");

    // Tracking should still be disabled, so no reasons should be tracked
    expect(Q.getUnhandledReasons().length).toBe(0);

    // Reset should enable tracking again
    Q.resetUnhandledRejections();

    // Create another unhandled rejection
    Q.reject("another test reason");

    // Now tracking should be enabled and the reason should be captured
    expect(Q.getUnhandledReasons().length).toBe(1);
    expect(Q.getUnhandledReasons()[0]).toContain("another test reason");
  });
});