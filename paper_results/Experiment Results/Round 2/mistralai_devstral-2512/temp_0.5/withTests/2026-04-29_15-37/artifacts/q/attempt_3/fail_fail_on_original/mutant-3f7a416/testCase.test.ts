const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.allSettled", () => {
  it("should resolve with an array of promise states when called on a promise for an array of promises", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];
    const resultPromise = Q.all(promises).allSettled();
    deferred1.resolve(1);
    deferred2.reject(new Error("test error"));
    const result = await resultPromise;
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "rejected", reason: new Error("test error") }
    ]);
  });
});