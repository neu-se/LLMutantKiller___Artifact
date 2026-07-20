import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise when called on a promise instance", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promise = Q.any([deferred1.promise, deferred2.promise]);

    setTimeout(() => {
      deferred1.resolve("first");
    }, 10);

    const result = await promise;
    expect(result).toBe("first");
  });
});