import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first settled promise value", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const racePromise = Q.race([deferred1.promise, deferred2.promise]);

    deferred1.resolve(42);
    deferred2.resolve(99);

    const result = await racePromise;
    expect(result).toBe(42);
  });
});