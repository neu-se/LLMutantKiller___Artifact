// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly emit rejectionHandled event in Node.js environment", async () => {
    // This test specifically targets the mutation in the untrackRejection function
    // where the condition checks typeof process === "" instead of typeof process === "object"

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the rejection to be tracked
    await Q.delay(10);

    // Handle the rejection
    let rejectionHandledEmitted = false;
    if (typeof process === "object" && typeof process.emit === "function") {
      process.once("rejectionHandled", () => {
        rejectionHandledEmitted = true;
      });
    }

    rejectedPromise.catch(() => {});

    // Wait for the rejection to be untracked
    await Q.delay(10);

    // In the original code, this should be true in Node.js environment
    // In the mutated code, this will be false because the condition fails
    if (typeof process === "object" && typeof process.emit === "function") {
      expect(rejectionHandledEmitted).toBe(true);
    }
  });
});