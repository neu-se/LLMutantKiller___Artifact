const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout error message", () => {
  it("should include 'ms' unit in timeout error message", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    // Don't reject the deferred - let the timeout trigger
    try {
      await timeoutPromise;
      fail("Should have thrown a timeout error");
    } catch (error: any) {
      expect(error.message).toContain("ms");
      expect(error.message).toContain("100");
      expect(error.code).toBe("ETIMEDOUT");
    }
  });
});