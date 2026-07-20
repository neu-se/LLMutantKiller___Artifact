import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
  it("should spread array values as arguments to the fulfilled callback", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promise = Q.all([deferred1.promise, deferred2.promise, deferred3.promise])
      .spread((val1: number, val2: number, val3: number) => {
        return val1 + val2 + val3;
      });

    deferred1.resolve(10);
    deferred2.resolve(20);
    deferred3.resolve(30);

    const result = await promise;
    expect(result).toBe(60);
  });
});