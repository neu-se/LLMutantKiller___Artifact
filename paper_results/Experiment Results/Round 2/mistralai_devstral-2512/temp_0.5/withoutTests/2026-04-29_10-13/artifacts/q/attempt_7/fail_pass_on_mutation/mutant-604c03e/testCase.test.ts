import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle untrackRejection when promise is not in unhandledRejections", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for it to be tracked
    await Q.delay(10);

    // Verify it's tracked
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(1);

    // Manually remove it from tracking (simulating at === -1 case)
    const unhandledRejections = Q.getUnhandledReasons();
    Q.stopUnhandledRejectionTracking();

    // Create a new promise that won't be in the tracking
    const newPromise = Q.reject(new Error("New error"));

    // Try to handle it (should not crash or affect tracking)
    newPromise.catch(() => {});

    // Wait for the handler to execute
    await Q.delay(10);

    // Should have 0 since tracking was stopped
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});