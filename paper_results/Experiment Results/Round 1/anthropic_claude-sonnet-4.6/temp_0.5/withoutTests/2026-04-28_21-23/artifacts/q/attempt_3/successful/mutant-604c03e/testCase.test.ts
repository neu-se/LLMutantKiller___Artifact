import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection with at === -1", () => {
  it("should not corrupt unhandledReasons list when promise is not in tracking list", async () => {
    Q.resetUnhandledRejections();

    // Create an unhandled rejection - this gets tracked
    const sentinel = new Error("sentinel error");
    Q.reject(sentinel);

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Create another rejection and handle it TWICE
    // First .fail() removes it from the list (at >= 0)
    // Second .fail() tries to remove it again (at === -1)
    // Original: if (at !== -1) -> no-op, sentinel stays
    // Mutated: if (true) -> splice(-1, 1) removes sentinel!
    const handled = Q.reject(new Error("handled twice"));
    handled.fail(function() { return null; });
    handled.fail(function() { return null; });

    await new Promise(resolve => setTimeout(resolve, 50));

    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toContain("sentinel error");
  });
});