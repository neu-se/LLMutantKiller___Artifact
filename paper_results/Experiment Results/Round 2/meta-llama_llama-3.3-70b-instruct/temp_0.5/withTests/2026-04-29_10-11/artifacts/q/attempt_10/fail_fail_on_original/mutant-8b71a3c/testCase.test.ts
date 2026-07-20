describe("Promise", () => {
  it("should return promise when inspected state is pending", () => {
    const Q = require("../../../../../q.js");
    const deferred = Q.defer();
    const promise = deferred.promise;
    const inspected = promise.inspect();
    expect(inspected.state).toBe("pending");
    const originalValueOf = promise.valueOf;
    promise.valueOf = function () {
      if (inspected.state === "pending") {
        return promise;
      } else {
        return inspected.value;
      }
    };
    expect(promise.valueOf()).toBe(promise);
    promise.valueOf = originalValueOf;
    deferred.resolve();
    expect(promise.valueOf()).not.toBe(promise);
  });
});