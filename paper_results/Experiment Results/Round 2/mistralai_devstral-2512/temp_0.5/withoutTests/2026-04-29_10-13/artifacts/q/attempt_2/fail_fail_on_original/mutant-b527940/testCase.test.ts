import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should track and untrack unhandled rejections correctly", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Add a handler after a delay to test untracking
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // After handling, check if it was properly untracked
        const unhandled = Q.getUnhandledReasons();
        expect(unhandled.length).toBe(0);
        done();
      });
    }, 10);

    // Give time for the rejection to be tracked initially
    setTimeout(() => {
      const unhandled = Q.getUnhandledReasons();
      expect(unhandled.length).toBeGreaterThan(0);
    }, 5);
  });
});