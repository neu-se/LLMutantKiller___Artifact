import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections with stack traces", async () => {
    // Create a rejected promise that will not be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Wait for the unhandled rejection to be tracked
    await new Promise(resolve => setTimeout(resolve, 10));

    // Get the unhandled reasons
    const unhandledReasons = Q.getUnhandledReasons();

    // Verify that the stack trace was captured
    expect(unhandledReasons.length).toBeGreaterThan(0);
    expect(unhandledReasons[0]).toContain("Test error");
    expect(unhandledReasons[0]).toContain("at ");

    // Clean up
    Q.resetUnhandledRejections();
  });
});