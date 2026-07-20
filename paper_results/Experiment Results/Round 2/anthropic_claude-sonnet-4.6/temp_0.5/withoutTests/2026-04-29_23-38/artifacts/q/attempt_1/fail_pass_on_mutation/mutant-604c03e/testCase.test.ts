import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandledReasons when it is handled", async () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejection = Q.reject(new Error("test error"));

    // Wait a tick to let the rejection be tracked
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // Verify it's tracked as unhandled
    const reasonsBefore = Q.getUnhandledReasons();
    expect(reasonsBefore.length).toBeGreaterThan(0);

    // Handle the rejection
    rejection.then(null, function () {
      // handled
    });

    // Wait for async processing
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // After handling, the rejection should be removed from unhandled reasons
    const reasonsAfter = Q.getUnhandledReasons();
    expect(reasonsAfter.length).toBe(0);
  });
});