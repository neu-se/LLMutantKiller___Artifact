import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("handles double-handling of rejection without corrupting unhandled reasons", () => {
    Q.resetUnhandledRejections();

    const err1 = new Error("unrelated");
    Q.reject(err1); // this stays unhandled

    const err2 = new Error("double handled");
    const rejection = Q.reject(err2);

    // Handle it once - removes from list (at=1, found)
    rejection.fail(function() { return "first"; });
    // Handle it again - now at === -1 (already removed)
    // Original: if (at !== -1) -> skip, unrelated stays
    // Mutated: if (true) -> splice(-1, 1) removes unrelated (last element)
    rejection.fail(function() { return "second"; });

    return new Promise<void>(resolve => setTimeout(resolve, 100))
      .then(function() {
        const reasons = Q.getUnhandledReasons();
        expect(reasons.length).toBe(1);
        expect(reasons[0]).toContain("unrelated");
      });
  });
});