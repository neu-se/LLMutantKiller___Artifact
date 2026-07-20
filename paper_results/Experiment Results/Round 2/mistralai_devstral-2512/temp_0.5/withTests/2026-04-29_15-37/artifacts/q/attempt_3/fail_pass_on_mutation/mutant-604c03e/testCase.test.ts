import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track and untrack rejections correctly", () => {
    Q.resetUnhandledRejections();
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Initially should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    promise.catch(() => {
      // After handling, the rejection should be untracked
      // This test will fail on the mutated code because untrackRejection
      // will return early and not remove the rejection from tracking
      expect(Q.getUnhandledReasons().length).toBe(0);
    });

    // Give time for the promise to settle
    return Q.delay(10).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});