import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with pending promises", () => {
  it("should resolve with all values when promises in the array are pending and eventually fulfill", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const allPromise = Q.all([deferred1.promise, deferred2.promise]);

    deferred1.resolve(1);
    deferred2.resolve(2);

    const result = await allPromise;
    expect(result).toEqual([1, 2]);
  });
});