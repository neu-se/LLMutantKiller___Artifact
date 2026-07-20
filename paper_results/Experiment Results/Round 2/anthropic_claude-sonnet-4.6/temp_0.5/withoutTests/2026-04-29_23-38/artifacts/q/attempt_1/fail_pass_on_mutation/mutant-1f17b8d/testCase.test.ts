import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with pending promises", () => {
  it("should resolve with all values when all promises are pending and eventually resolve", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const allPromise = Q.all([deferred1.promise, deferred2.promise, deferred3.promise]);

    deferred1.resolve(1);
    deferred2.resolve(2);
    deferred3.resolve(3);

    const result = await allPromise;
    expect(result).toEqual([1, 2, 3]);
  });
});