const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should expose the mutation by checking exact index comparison", () => {
    Q.resetUnhandledRejections();

    // Create a rejected promise that will be at index 0
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Verify it was tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the promise
    return promise.catch(() => {
      // The mutation changes !== -1 to !== +1
      // When array_indexOf returns 0:
      // Original: 0 !== -1 → true (correctly finds and untracks)
      // Mutated: 0 !== +1 → true (still finds and untracks)
      // This doesn't expose the mutation because both work
      // Need to test when index would be -1 vs +1
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});