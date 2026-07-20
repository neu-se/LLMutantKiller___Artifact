import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("does not remove last unhandled reason when handling a rejection that was already handled", () => {
    Q.resetUnhandledRejections();

    // Create rejections that get tracked
    const err1 = new Error("first");
    const err2 = new Error("second");
    const p1 = Q.reject(err1);
    const p2 = Q.reject(err2);

    // Handle both - untrackRejection called with promises IN the list (at >= 0)
    // Both original and mutated behave same here
    p1.fail(function() {});
    p2.fail(function() {});

    // Now add a new unhandled rejection
    const err3 = new Error("third");
    Q.reject(err3);

    // Handle a promise that is NOT in the unhandledRejections list
    // (a fulfilled promise) - untrackRejection called, array_indexOf returns -1
    // Original: if (at !== -1) -> skip, err3 stays in list
    // Mutated: if (true) -> splice(-1, 1) removes err3 (last element)
    Q(1).fail(function() {});

    return new Promise<void>(resolve => setTimeout(resolve, 200))
      .then(function() {
        const reasons = Q.getUnhandledReasons();
        expect(reasons.some((r: string) => r.includes("third"))).toBe(true);
      });
  });
});