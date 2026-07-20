const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should correctly untrack promise at index 0 when handling rejection", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked (should be at index 0)
    const initialReasons = Q.getUnhandledReasons();
    expect(initialReasons.length).toBe(1);
    expect(initialReasons[0]).toContain("test error");

    // Handle the promise to trigger untracking
    return promise.catch(() => {
      // With the mutation ( !== +1 instead of !== -1), index 0 won't be found
      // so the rejection won't be untracked
      const finalReasons = Q.getUnhandledReasons();
      expect(finalReasons.length).toBe(0);
    });
  });
});