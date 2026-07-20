// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly track and untrack rejections in Node.js environment", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the rejection to be tracked
    await Q.delay(10);

    // Get the current unhandled reasons
    const reasonsBefore = Q.getUnhandledReasons();
    expect(reasonsBefore.length).toBeGreaterThan(0);

    // Handle the rejection
    rejectedPromise.catch(() => {});

    // Wait for the rejection to be untracked
    await Q.delay(10);

    // Get the unhandled reasons again
    const reasonsAfter = Q.getUnhandledReasons();
    expect(reasonsAfter.length).toBe(0);
  });
});