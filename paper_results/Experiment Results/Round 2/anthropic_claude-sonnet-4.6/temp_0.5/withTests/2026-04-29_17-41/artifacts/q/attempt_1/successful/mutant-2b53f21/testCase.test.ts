import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when a rejection handler is provided", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Initially, the rejection should be tracked as unhandled
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    // Now handle the rejection by providing a rejected callback
    // This should call untrackRejection, removing it from unhandledReasons
    return rejected.then(null, function (reason) {
      // rejection handled
      expect(reason).toBe(error);
    }).then(function () {
      // After handling, the rejection should no longer be in unhandled reasons
      expect(Q.getUnhandledReasons()).toEqual([]);
    });
  });
});