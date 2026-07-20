import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first fulfilled promise", async () => {
    const p1 = Q.defer();
    const p2 = Q.defer();

    const racePromise = Q.race([p1.promise, p2.promise]);

    p1.resolve(42);
    p2.resolve(99);

    const result = await racePromise;
    expect(result).toBe(42);
  });
});