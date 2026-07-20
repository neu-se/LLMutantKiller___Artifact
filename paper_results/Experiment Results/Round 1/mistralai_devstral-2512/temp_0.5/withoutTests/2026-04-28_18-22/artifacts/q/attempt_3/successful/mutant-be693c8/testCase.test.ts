const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout", () => {
  it("should reject with a timeout error when the promise does not resolve within the specified time", (done) => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(50, "Custom timeout error");

    // Set up a timer to reject the deferred after the timeout should have occurred
    setTimeout(() => {
      deferred.resolve("This should not be resolved");
    }, 100);

    timeoutPromise.then(
      () => {
        done(new Error("Promise should have been rejected due to timeout"));
      },
      (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Custom timeout error");
        expect((error as any).code).toBe("ETIMEDOUT");
        done();
      }
    );
  });
});