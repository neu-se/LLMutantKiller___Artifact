import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly handle untrackRejection when promise is not found", async () => {
    // Create a rejected promise and immediately handle it
    const promise = Q.reject(new Error("Test error")).catch(() => {});

    // Wait for processing
    await Q.delay(10);

    // Verify no unhandled rejections
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);

    // Now try to handle it again (should be safe)
    promise.catch(() => {});

    // Wait for processing
    await Q.delay(10);

    // Should still have no unhandled rejections
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});