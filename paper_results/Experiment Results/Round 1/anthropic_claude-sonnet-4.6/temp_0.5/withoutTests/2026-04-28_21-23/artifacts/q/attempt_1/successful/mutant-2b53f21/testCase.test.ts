import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when it is handled by a rejection callback", async () => {
    // Reset any existing unhandled rejections
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);

    // Initially, the rejection should be tracked as unhandled
    // We need to wait a tick for tracking to register
    await new Promise<void>((resolve) => setTimeout(resolve, 10));

    // Now handle the rejection - this should call untrackRejection
    await rejectedPromise.then(null, function (err) {
      // handled - swallow the error
      return "handled";
    });

    // Wait for async operations to complete
    await new Promise<void>((resolve) => setTimeout(resolve, 10));

    // After handling, the rejection should be removed from unhandled reasons
    // In the original code: untrackRejection is called, so getUnhandledReasons() should be empty
    // In the mutated code: untrackRejection is NOT called, so getUnhandledReasons() still has the reason
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});