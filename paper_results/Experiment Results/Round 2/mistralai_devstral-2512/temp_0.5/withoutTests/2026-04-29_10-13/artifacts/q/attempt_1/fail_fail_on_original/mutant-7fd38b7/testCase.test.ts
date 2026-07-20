import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should enable unhandled rejection tracking when resetUnhandledRejections is called", () => {
    // Disable tracking initially
    Q.stopUnhandledRejectionTracking();

    // Reset should re-enable tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give the event loop time to process the unhandled rejection
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Check if the rejection was tracked
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBeGreaterThan(0);
        expect(unhandledReasons[0]).toContain("Test error");
        resolve();
      }, 10);
    });
  });
});