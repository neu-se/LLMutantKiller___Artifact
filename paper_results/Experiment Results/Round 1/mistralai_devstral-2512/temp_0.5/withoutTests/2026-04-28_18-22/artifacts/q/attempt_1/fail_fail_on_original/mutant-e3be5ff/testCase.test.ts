import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", () => {
    // Disable unhandled rejection tracking
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise that should not be tracked
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Verify that the unhandled rejection is not tracked
    // In the original code, when tracking is disabled, the resetUnhandledRejections
    // function should early return and not modify the unhandledRejections array
    // In the mutated code, it would incorrectly try to process when tracking is disabled
    expect(Q.getUnhandledReasons()).toHaveLength(0);
  });
});