import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("removes rejection from unhandledReasons when rejection is handled via .then", async () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise - trackRejection adds it to unhandledReasons
    const error = new Error("unhandled rejection test");
    const p = Q.reject(error);

    // Verify it's tracked
    await new Promise<void>(resolve => setImmediate(resolve));
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection - the "when" handler calls untrackRejection
    // when a rejected callback is provided
    const handled = p.then(null, function(e) { return "caught"; });
    await handled;

    await new Promise<void>(resolve => setImmediate(resolve));
    await new Promise<void>(resolve => setImmediate(resolve));

    // Original: splice runs → 0 unhandled reasons
    // Mutated: splice skipped → 1 unhandled reason remains
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});