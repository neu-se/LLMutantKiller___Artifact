import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should only untrack when promise is found in unhandledRejections", async () => {
    // Create and immediately handle a rejected promise
    const handledPromise = Q.reject(new Error("Handled error")).catch(() => {});

    // Wait for processing
    await Q.delay(10);

    // Verify no unhandled rejections
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);

    // Create a new rejected promise that will be tracked
    const rejectedPromise = Q.reject(new Error("Unhandled error"));

    // Wait for it to be tracked
    await Q.delay(10);

    // Verify it's tracked
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(1);

    // Now handle it
    rejectedPromise.catch(() => {});

    // Wait for untracking
    await Q.delay(10);

    // Should be untracked
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});