const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise inspection mutation test", () => {
  it("should correctly identify pending promises resolved to fulfilled promises", async () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;
    const fulfilledPromise = Q(42);

    // Resolve the pending promise with a fulfilled promise
    deferred.resolve(fulfilledPromise);

    // The pending promise should now be fulfilled with value 42
    const snapshot = pendingPromise.inspect();
    expect(snapshot.state).toBe("fulfilled");
    expect(snapshot.value).toBe(42);
  });
});