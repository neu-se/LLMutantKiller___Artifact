const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout", () => {
  it("should reject with string error message when timeout occurs with string error", () => {
    const deferred = Q.defer();
    const promise = deferred.promise.timeout(10, "Timeout error message");

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error: any) => {
        expect(error.message).toBe("Timeout error message");
      }
    );
  });
});