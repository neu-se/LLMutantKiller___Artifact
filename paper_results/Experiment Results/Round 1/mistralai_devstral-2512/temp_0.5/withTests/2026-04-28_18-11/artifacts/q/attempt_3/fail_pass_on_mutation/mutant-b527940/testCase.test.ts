const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly untrack rejections when promise is at index 0 in unhandledRejections array", () => {
    Q.resetUnhandledRejections();

    // Create and reject a promise to track it
    const deferred1 = Q.defer();
    deferred1.reject(new Error("first error"));

    // Create another promise that will be at index 0 when handled
    const deferred2 = Q.defer();
    const promise2 = deferred2.promise;
    deferred2.reject(new Error("second error"));

    // Handle the second promise (which should be at index 0)
    return promise2.catch(() => {
      // The second error should be untracked
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);
      expect(reasons[0]).toContain("first error");
    });
  });
});