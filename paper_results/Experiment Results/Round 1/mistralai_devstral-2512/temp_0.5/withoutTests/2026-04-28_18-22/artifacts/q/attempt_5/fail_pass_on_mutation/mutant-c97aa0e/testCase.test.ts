const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should properly implement Promise.prototype.any", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promise1 = deferred1.promise;
    const promise2 = deferred2.promise;
    const promise3 = deferred3.promise;

    const anyPromise = Q.any([promise1, promise2, promise3]);

    // Verify that anyPromise has the correct prototype method
    expect(typeof anyPromise.any).toBe('function');

    // Now test the actual functionality
    setTimeout(() => {
      deferred2.resolve("success");
    }, 10);

    const result = await anyPromise;
    expect(result).toBe("success");
  });
});