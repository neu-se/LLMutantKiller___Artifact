import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when trackUnhandledRejections is true", (done) => {
    // Reset the state to ensure clean test conditions
    Q.resetUnhandledRejections();

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the next tick to allow the rejection tracking to occur
    setTimeout(() => {
      // Check that the rejection was tracked
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections.length).toBe(1);
      expect(unhandledRejections[0]).toContain("Test error");
      done();
    }, 10);
  });
});