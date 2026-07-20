import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.race", () => {
  it("should resolve with the value of the first settled promise without error", async () => {
    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    const racePromise = Q([d1.promise, d2.promise, d3.promise]).race();

    d2.resolve(42);
    d1.resolve(1);
    d3.resolve(3);

    const result = await racePromise;
    expect(result).toBe(42);
  });
});