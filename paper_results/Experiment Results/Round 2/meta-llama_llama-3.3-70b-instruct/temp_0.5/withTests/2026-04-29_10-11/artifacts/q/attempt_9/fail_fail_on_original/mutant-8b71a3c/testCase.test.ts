describe("Promise", () => {
  it("should return promise when inspected state is pending", () => {
    const Q = require("../../../../../../../q.js");
    const deferred = Q.defer();
    const promise = deferred.promise;
    const originalValueOf = promise.valueOf;
    promise.valueOf = function () {
      const inspected = this.inspect();
      if (inspected.state === "pending") {
        return this;
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