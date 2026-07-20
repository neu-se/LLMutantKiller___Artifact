import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly untrack handled rejections", () => {
    Q.resetUnhandledRejections();
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Initially should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    promise.catch(() => {});

    // After handling, should be untracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});