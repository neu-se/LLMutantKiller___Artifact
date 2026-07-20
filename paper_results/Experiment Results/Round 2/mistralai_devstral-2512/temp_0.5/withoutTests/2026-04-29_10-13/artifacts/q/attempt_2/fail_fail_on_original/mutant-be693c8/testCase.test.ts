import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with timeout error when promise does not resolve in time", (done) => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(50);

    timeoutPromise.then(
      () => {
        done(new Error("Promise should have been rejected due to timeout"));
      },
      (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Timed out after");
        expect(error.code).toBe("ETIMEDOUT");
        done();
      }
    );
  });
});