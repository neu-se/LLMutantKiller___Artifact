import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when the rejection is handled via .fail()", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise and handle it
    const handledPromise = Q.reject("handled reason").fail(function () {
      // rejection is handled here
    });

    // Wait for async operations to complete
    return handledPromise.fin(function () {
      // After handling, the rejection should no longer be in unhandled reasons
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});