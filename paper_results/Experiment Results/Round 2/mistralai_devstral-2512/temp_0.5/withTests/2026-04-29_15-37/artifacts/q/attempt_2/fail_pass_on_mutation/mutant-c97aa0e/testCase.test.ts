import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise that resolves when any of the input promises resolves", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    setTimeout(() => {
      deferred1.resolve("first");
    }, 10);

    setTimeout(() => {
      deferred2.resolve("second");
    }, 20);

    const result = await Q.any(promises);
    expect(result).toBe("first");
  });
});