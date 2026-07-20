const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly untrack promise when it's at index 0 in unhandledRejections", () => {
    Q.resetUnhandledRejections();

    // Create first rejected promise (will be at index 0)
    const deferred1 = Q.defer();
    const promise1 = deferred1.promise;
    deferred1.reject(new Error("first error"));

    // Create second rejected promise
    const deferred2 = Q.defer();
    deferred2.reject(new Error("second error"));

    // Verify both were tracked
    expect(Q.getUnhandledReasons().length).toBe(2);

    // Handle the first promise (at index 0) - this is where the mutation matters
    return promise1.catch(() => {
      // With original code ( !== -1), index 0 is found and untracked
      // With mutation ( !== +1), index 0 is NOT found (0 !== 1 is true)
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);
      expect(reasons[0]).toContain("second error");
    });
  });
});