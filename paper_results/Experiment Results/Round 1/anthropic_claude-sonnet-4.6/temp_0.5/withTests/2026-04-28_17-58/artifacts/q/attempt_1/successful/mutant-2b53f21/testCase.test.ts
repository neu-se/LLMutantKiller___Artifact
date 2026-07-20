import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should remove a rejection from unhandled reasons when a rejection handler is attached", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejectedPromise = Q.reject(error);

    // Before handling, the rejection should be tracked
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    // Attach a rejection handler - this should untrack the rejection
    return rejectedPromise.then(null, function () {
      // rejection handled
    }).then(function () {
      // After handling, the rejection should no longer be in unhandled reasons
      expect(Q.getUnhandledReasons()).toEqual([]);
    });
  });
});