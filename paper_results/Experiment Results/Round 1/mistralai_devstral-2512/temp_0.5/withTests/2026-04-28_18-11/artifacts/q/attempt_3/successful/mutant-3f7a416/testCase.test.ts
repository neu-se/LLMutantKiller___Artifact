const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.allSettled", () => {
  it("should return a promise that resolves with inspection states of all input promises", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise, 10];

    setTimeout(() => {
      deferred1.resolve(42);
      deferred2.reject(new Error("test error"));
    }, 10);

    const result = await Q.allSettled(promises);

    expect(result).toEqual([
      { state: "fulfilled", value: 42 },
      { state: "rejected", reason: new Error("test error") },
      { state: "fulfilled", value: 10 }
    ]);
  });
});