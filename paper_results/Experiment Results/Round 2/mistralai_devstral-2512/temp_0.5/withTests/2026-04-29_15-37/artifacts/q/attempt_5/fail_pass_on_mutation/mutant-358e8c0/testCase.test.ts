const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise inspection mutation test", () => {
  it("should correctly identify promises resolved to rejected promises", async () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    const rejectedPromise = Q.reject(error);

    // Resolve the deferred with a rejected promise
    deferred.resolve(rejectedPromise);

    // The deferred's promise should now be rejected
    const snapshot = deferred.promise.inspect();
    expect(snapshot.state).toBe("rejected");
    expect(snapshot.reason).toBe(error);
  });
});