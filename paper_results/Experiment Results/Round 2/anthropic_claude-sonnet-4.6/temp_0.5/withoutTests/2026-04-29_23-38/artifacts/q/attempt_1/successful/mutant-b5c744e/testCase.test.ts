import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the first fulfilled promise when given an array of promises", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promises = [deferred1.promise, deferred2.promise, deferred3.promise];

    const anyPromise = Q.any(promises);

    deferred2.resolve("second");

    const result = await anyPromise;
    expect(result).toBe("second");
  });
});