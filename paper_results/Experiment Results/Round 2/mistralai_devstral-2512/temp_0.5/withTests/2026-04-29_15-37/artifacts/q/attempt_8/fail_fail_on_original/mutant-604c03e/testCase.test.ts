import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly untrack rejections when promise is not in array", () => {
    Q.resetUnhandledRejections();

    // Create a promise that will be handled immediately
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Manually handle it to trigger untrackRejection
    promise.catch(() => {});

    // Force a sync check - the mutation causes untrackRejection to return early
    // when checking if promise is in array, preventing proper cleanup
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(0);
  });
});