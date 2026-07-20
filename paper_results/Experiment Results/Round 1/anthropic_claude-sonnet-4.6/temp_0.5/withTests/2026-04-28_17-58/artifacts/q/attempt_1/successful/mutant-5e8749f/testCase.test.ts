import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("removes a rejection from unhandled reasons when the rejection is handled via .fail()", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise and handle it
    return Q.reject("handled reason")
      .fail(function () {
        // handled - swallow the rejection
      })
      .fin(function () {
        expect(Q.getUnhandledReasons().length).toEqual(0);
      });
  });
});