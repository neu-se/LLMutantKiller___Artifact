import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should preserve unrelated unhandled rejections when one rejection is handled", () => {
    Q.resetUnhandledRejections();

    // Create two unhandled rejections
    Q.reject("unhandled reason 1");
    Q.reject("unhandled reason 2");

    expect(Q.getUnhandledReasons().length).toEqual(2);

    // Handle one rejection - this calls untrackRejection
    const handled = Q.reject("handled reason").fail(function () {
      return "recovered";
    });

    return handled.then(function () {
      // With mutation (if true), splice(-1, 1) removes last element
      // even though the promise wasn't in the list
      expect(Q.getUnhandledReasons().length).toEqual(2);
    });
  });
});