const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly untrack rejections when promise is at index 0", () => {
    Q.resetUnhandledRejections();
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger rejection tracking
    deferred.reject(new Error("test error"));

    // Verify the rejection was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection to trigger untracking
    return promise.catch(() => {
      // After handling, the rejection should be untracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});