import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly track and untrack rejections", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the rejection to be tracked
    await Q.delay(10);

    // Verify it's tracked
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(1);

    // Handle the rejection
    rejectedPromise.catch(() => {});

    // Wait for the handler to execute
    await Q.delay(10);

    // The rejection should now be untracked
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});