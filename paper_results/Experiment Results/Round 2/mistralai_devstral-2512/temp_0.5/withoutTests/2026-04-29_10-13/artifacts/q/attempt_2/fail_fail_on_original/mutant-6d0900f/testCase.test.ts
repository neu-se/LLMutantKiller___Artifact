import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when tracking is enabled", (done) => {
    // Reset to ensure tracking is enabled
    Q.resetUnhandledRejections();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons[0]).toContain("Test error");
      done();
    }, 10);
  });
});