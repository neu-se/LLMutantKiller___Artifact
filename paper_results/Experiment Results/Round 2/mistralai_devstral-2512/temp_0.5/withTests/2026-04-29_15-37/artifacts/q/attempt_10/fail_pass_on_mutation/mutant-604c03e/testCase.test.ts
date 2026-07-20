import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly clean up rejection tracking when promise is handled", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test error");
    const promise = Q.reject(error);

    // Initially should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection
    promise.catch(() => {});

    // The mutation causes untrackRejection to always return early
    // preventing the rejection from being removed from tracking
    // We need to check after the async operation completes
    return Q.delay(0).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});