import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly untrack rejections when handled", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test error");
    const promise = Q.reject(error);

    // Initially should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection and wait for the untracking to complete
    return promise.catch(() => {
      // After handling, the rejection should be untracked
      // This assertion will fail on the mutated code because
      // untrackRejection will return early and not remove the rejection
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});