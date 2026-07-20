const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise inspection mutation test", () => {
  it("should correctly handle promise chaining with inspection", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const error = new Error("test error");

    // Chain promises where the first resolves to a rejected promise
    deferred1.resolve(deferred2.promise);
    deferred2.reject(error);

    // The first promise should now show as rejected in inspection
    const snapshot = deferred1.promise.inspect();
    expect(snapshot.state).toBe("rejected");
    expect(snapshot.reason).toBe(error);
  });
});