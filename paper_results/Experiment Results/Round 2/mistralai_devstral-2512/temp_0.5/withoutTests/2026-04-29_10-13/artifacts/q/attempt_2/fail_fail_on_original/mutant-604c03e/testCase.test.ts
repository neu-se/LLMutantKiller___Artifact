import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Add a handler after some time to ensure it's tracked
    await Q.delay(10);

    // Handle the rejection
    let handled = false;
    rejectedPromise.catch(() => {
      handled = true;
    });

    // Wait for the handler to execute
    await Q.delay(10);

    // The rejection should now be untracked
    const unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});