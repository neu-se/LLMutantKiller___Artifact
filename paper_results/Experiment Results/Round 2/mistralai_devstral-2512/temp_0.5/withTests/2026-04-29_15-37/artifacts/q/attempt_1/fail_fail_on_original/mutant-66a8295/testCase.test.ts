import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", () => {
    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create and reject a promise without handling it
    Q.reject(new Error("test error"));

    // Give some time for the tracking to potentially happen
    return Q.delay(10).then(() => {
      // Verify no unhandled rejections were tracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});