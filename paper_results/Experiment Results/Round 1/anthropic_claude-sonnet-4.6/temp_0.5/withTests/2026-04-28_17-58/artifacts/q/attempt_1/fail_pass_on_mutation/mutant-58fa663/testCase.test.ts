import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove the rejection from unhandled reasons when a rejection is handled via .fail()", done => {
    Q.resetUnhandledRejections();

    const rejection = Q.reject("test error reason");

    // Give the rejection time to be tracked
    setTimeout(() => {
      // Before handling, it should be in unhandled reasons
      expect(Q.getUnhandledReasons()).toEqual(["(no stack) test error reason"]);

      // Handle the rejection by chaining off it
      rejection.fail(() => {
        // handled
      });

      // After handling, it should be removed from unhandled reasons
      setTimeout(() => {
        expect(Q.getUnhandledReasons()).toEqual([]);
        done();
      }, 50);
    }, 50);
  });
});