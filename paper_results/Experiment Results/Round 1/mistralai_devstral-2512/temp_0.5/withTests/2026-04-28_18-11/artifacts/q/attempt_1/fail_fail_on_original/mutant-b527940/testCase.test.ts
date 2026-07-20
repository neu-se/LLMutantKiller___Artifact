import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should correctly track and untrack rejections when promise is at index 0", () => {
    Q.resetUnhandledRejections();
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger rejection tracking
    deferred.reject(new Error("test error"));

    // Verify the rejection was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection to trigger untracking
    promise.catch(() => {
      // After handling, the rejection should be untracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });

    // Return a promise that waits for the tracking to complete
    return Q.delay(10).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});