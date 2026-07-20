import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not report a rejection that has been handled via .fail()", () => {
    Q.resetUnhandledRejections();

    // Create a rejection and immediately handle it
    const error = new Error("handled rejection");
    const handled = Q.reject(error).fail(function () {
      // handled
      return "recovered";
    });

    return handled.then(function () {
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});