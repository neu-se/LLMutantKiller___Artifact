import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first fulfilled promise", async () => {
    const d1 = Q.defer();
    const d2 = Q.defer();

    const racePromise = Q.race([d1.promise, d2.promise]);

    d2.resolve("second");
    d1.resolve("first");

    const result = await racePromise;
    expect(result).toBe("second");
  });
});