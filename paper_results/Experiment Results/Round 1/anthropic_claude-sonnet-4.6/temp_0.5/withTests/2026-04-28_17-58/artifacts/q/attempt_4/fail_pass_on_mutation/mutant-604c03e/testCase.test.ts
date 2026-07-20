import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("does not corrupt unhandled reasons list when handling a rejection not in the list", () => {
    Q.resetUnhandledRejections();

    // Add rejections to the unhandled list
    Q.reject(new Error("unhandled one"));
    Q.reject(new Error("unhandled two"));

    expect(Q.getUnhandledReasons().length).toBe(2);

    // Create a deferred, attach handler FIRST (before rejection is tracked),
    // then reject - so when untrackRejection fires, the promise won't be in
    // the unhandledRejections array (array_indexOf returns -1)
    // Original: if (at !== -1) -> skips splice, list stays at 2
    // Mutated: if (true) -> splice(-1, 1) removes LAST element, list becomes 1
    const d = Q.defer();
    const handled = d.promise.fail(function() { return "ok"; });
    d.reject(new Error("handled before tracking"));

    return Q.delay(50, "done").then(function() {
      expect(Q.getUnhandledReasons().length).toBe(2);
    });
  });
});