import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection with && vs || condition", () => {
  it("should remove a rejection from unhandled reasons when it gets handled", async () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise - this adds it to unhandledRejections
    const rejection = Q.reject(new Error("test error"));

    // Verify it's tracked as unhandled
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection by chaining a .fail handler
    // This calls untrackRejection internally
    await rejection.fail(function () {
      // handled
    });

    // After handling, the rejection should be removed from unhandled reasons
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});