import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle rejection tracking with multiple promises", () => {
    Q.resetUnhandledRejections();

    const error1 = new Error("error1");
    const error2 = new Error("error2");

    const promise1 = Q.reject(error1);
    const promise2 = Q.reject(error2);

    // Both should be tracked initially
    expect(Q.getUnhandledReasons().length).toBe(2);

    // Handle first promise
    promise1.catch(() => {});

    // Wait for untracking to complete
    return Q.delay(10).then(() => {
      // After handling first, only one should remain
      // This will fail on mutated code because untrackRejection returns early
      expect(Q.getUnhandledReasons().length).toBe(1);

      // Handle second promise
      promise2.catch(() => {});

      return Q.delay(10).then(() => {
        // Now none should remain
        expect(Q.getUnhandledReasons().length).toBe(0);
      });
    });
  });
});