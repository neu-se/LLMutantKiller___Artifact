import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should remove a rejection from unhandled reasons when it is handled", async () => {
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection");
    const rejected = Q.reject(reason);

    // At this point, the rejection should be tracked as unhandled
    // We need to wait a tick for the tracking to register
    await new Promise<void>((resolve) => setTimeout(resolve, 10));

    // Now handle the rejection - this should call untrackRejection
    const handled = rejected.then(null, function (err) {
      // rejection handler - this triggers untrackRejection
      return "handled";
    });

    // Wait for the promise chain to settle
    await handled;

    // Wait another tick for untrackRejection to complete
    await new Promise<void>((resolve) => setTimeout(resolve, 10));

    // In the original code, untrackRejection removes the promise from unhandledReasons
    // In the mutated code, untrackRejection does nothing, so the reason remains
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons).toHaveLength(0);
  });
});