import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not remove rejections from unhandledReasons when tracking has been stopped", () => {
    Q.resetUnhandledRejections();

    // Stop tracking - sets trackUnhandledRejections = false
    Q.stopUnhandledRejectionTracking();

    // Now manually re-enable tracking by resetting
    Q.resetUnhandledRejections();

    // With tracking re-enabled, create a rejection and handle it
    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Immediately check - rejection should be tracked
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    // Handle the rejection
    return rejected.fail(function () {
      return "recovered";
    }).then(function () {
      // Original: untrackRejection only runs when !trackUnhandledRejections (i.e., when false)
      // Since tracking is now true, untrackRejection is a no-op → rejection stays
      // Mutated: if(true) always runs → rejection gets removed → array is empty
      expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
  });
});