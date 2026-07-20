import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly remove handled rejections from tracking array", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test error");
    const promise = Q.reject(error);

    // Initially should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    promise.catch(() => {});

    // Give time for async untracking to complete
    return Q.delay(50).then(() => {
      // The mutation causes untrackRejection to always return early
      // so the rejection remains in the tracking array
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});