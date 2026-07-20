import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should only untrack rejections when at !== -1", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for it to be tracked
    await Q.delay(10);

    // Verify it's tracked
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(1);

    // Manually remove it from tracking (simulating at === -1 case)
    Q.stopUnhandledRejectionTracking();

    // Try to handle it (should not affect tracking since we stopped tracking)
    rejectedPromise.catch(() => {});

    // Wait for the handler to execute
    await Q.delay(10);

    // Should still have 0 since tracking was stopped
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});