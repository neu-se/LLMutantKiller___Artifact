import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("removes a handled rejection from unhandled reasons list after async handling", () => {
    Q.resetUnhandledRejections();

    const reason = "specific rejection reason";
    const rejected = Q.reject(reason);

    // Rejection should now be tracked
    expect(Q.getUnhandledReasons()).toEqual(["(no stack) " + reason]);

    // Handle the rejection - triggers untrackRejection
    const handled = rejected.fail(function () { return; });

    // Wait for async operations to complete
    return handled.then(function () {
      return Q.delay(50);
    }).then(function () {
      // In original: splices happen because process.emit IS a function → list is empty
      // In mutated: splices don't happen because process.emit IS a function (condition inverted) → list still has entry
      expect(Q.getUnhandledReasons()).toEqual([]);
    });
  });
});