import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
  it("should spread array values as arguments to the fulfillment callback", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promise = Q.spread([deferred1.promise, deferred2.promise], (a: number, b: number) => {
      return a + b;
    });

    deferred1.resolve(10);
    deferred2.resolve(20);

    const result = await promise;
    expect(result).toBe(30);
  });
});