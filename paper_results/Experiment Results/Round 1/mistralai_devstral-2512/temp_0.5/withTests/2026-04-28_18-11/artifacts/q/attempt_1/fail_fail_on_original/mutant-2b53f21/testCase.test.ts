// Test case to detect the mutation in the reject function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("reject function unhandled rejection tracking", () => {
  it("should untrack rejection when a rejected promise is handled", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Verify the rejection is initially tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    await rejectedPromise.catch(() => {});

    // In the original code, the rejection should be untracked
    // In the mutated code, it won't be untracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});