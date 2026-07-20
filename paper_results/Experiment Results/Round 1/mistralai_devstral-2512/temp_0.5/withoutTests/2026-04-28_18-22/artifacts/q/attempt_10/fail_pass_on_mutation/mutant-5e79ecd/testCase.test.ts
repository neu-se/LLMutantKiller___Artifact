const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise with done and subsequent then calls", () => {
    const deferred = Q.defer();
    let doneCalled = false;
    let thenCalled = false;

    deferred.promise.done((value: any) => {
      doneCalled = true;
    });

    const thenPromise = deferred.promise.then((value: any) => {
      thenCalled = true;
      return value;
    });

    // The mutation changes the promise assignment logic in done()
    // In the mutated version, the internal promise variable will be set to `true`
    // which will cause the .then() call to fail
    deferred.resolve(42);

    return thenPromise.then((value: any) => {
      expect(doneCalled).toBe(true);
      expect(thenCalled).toBe(true);
      expect(value).toBe(42);
    });
  });
});