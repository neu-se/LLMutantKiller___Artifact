import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should remove a rejection from unhandled reasons when it gets handled via .fail()", async () => {
    Q.resetUnhandledRejections();

    const rejection = Q.reject("test error reason");

    // At this point, the rejection should be tracked as unhandled
    expect(Q.getUnhandledReasons()).toEqual(["(no stack) test error reason"]);

    // Handle the rejection - this should trigger untrackRejection
    await rejection.fail(function () {
      // handled
    });

    // After handling, the unhandled reasons should be empty
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});