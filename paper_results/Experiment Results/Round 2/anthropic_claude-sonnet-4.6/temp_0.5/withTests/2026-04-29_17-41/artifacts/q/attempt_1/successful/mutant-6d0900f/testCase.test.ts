import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not report a rejection that has been handled via .then", () => {
    Q.resetUnhandledRejections();

    const rejected = Q.reject("handled reason");

    // Handle the rejection - this should call untrackRejection
    return rejected.then(
      null,
      function () {
        // rejection handled
      }
    ).then(function () {
      // After handling, the rejection should no longer be in unhandled reasons
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});