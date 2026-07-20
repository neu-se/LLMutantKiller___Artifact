const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout", () => {
  it("should reject with string error message when timeout occurs with string error", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise.timeout(10, "Timeout error message");

    // Let the timeout trigger
    setTimeout(() => {
      promise.then(
        () => done(new Error("Promise should have been rejected")),
        (error: string) => {
          expect(error).toBe("Timeout error message");
          done();
        }
      );
    }, 20);
  });
});