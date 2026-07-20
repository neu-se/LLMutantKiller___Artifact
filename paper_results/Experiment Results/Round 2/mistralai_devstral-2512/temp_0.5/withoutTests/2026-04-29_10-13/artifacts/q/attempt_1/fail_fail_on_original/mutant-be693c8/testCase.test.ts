import { Q } from "./q.js";

describe("Q.timeout", () => {
  it("should reject with timeout error when promise does not resolve in time", (done) => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(50);

    // Set up expectations
    timeoutPromise.then(
      () => {
        done(new Error("Promise should have been rejected due to timeout"));
      },
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Timed out after");
        expect(error.code).toBe("ETIMEDOUT");
        done();
      }
    );

    // Never resolve the deferred to trigger timeout
  });
});