import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection splice behavior", () => {
  it("should not remove last unhandled rejection when handling a promise that was never rejected", async () => {
    Q.resetUnhandledRejections();

    // Create an unhandled rejection to populate the list
    const err = new Error("should remain unhandled");
    Q.reject(err);

    await new Promise(resolve => setTimeout(resolve, 50));

    // Verify it's tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Now fulfill a promise and handle it - this calls untrackRejection
    // on a promise that was never in unhandledRejections (at === -1)
    // Original: if (at !== -1) -> no-op, list unchanged
    // Mutated: if (true) -> splice(-1, 1) removes last element!
    const p = Q.resolve("value");
    p.fail(function() {});

    await new Promise(resolve => setTimeout(resolve, 50));

    // The unhandled rejection should still be there
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});