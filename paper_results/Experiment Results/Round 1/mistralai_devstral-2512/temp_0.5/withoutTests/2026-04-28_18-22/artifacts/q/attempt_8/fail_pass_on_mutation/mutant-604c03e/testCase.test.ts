const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly clean up rejection tracking when handling multiple rejections", async () => {
    // Reset to ensure clean state
    Q.resetUnhandledRejections();

    // Create multiple rejections
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promise1 = deferred1.promise;
    const promise2 = deferred2.promise;

    // Cause rejections
    deferred1.reject(new Error("error1"));
    deferred2.reject(new Error("error2"));

    // Verify both are tracked
    expect(Q.getUnhandledReasons().length).toBe(2);

    // Handle first rejection
    await promise1.catch(() => {});

    // After handling first, one should remain
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle second rejection
    await promise2.catch(() => {});

    // After handling both, none should remain
    // This will fail on mutated code because it always returns early
    // in untrackRejection, preventing proper cleanup
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});