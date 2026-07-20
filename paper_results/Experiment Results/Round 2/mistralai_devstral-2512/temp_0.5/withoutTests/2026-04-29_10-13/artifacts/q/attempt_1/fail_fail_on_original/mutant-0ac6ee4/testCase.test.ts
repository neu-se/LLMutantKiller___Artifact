import { Q } from "./q.js";

describe("Q.timeout error message", () => {
  it("should include 'ms' unit in timeout error message", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    setTimeout(() => {
      deferred.reject(new Error("Original error"));
    }, 50);

    try {
      await timeoutPromise;
      fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).toContain("ms");
      expect(error.message).toContain("100");
    }
  });
});