const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.spread behavior", () => {
  it("should correctly pass fulfilled values to the callback", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.spread([deferred1.promise, deferred2.promise], (val1: number, val2: number) => {
      return val1 + val2;
    });

    deferred1.resolve(10);
    deferred2.resolve(20);

    const result = await promise;
    expect(result).toBe(30);
  });
});