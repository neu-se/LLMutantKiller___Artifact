import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the value of the first settled promise", async () => {
    const d1 = Q.defer();

    const racePromise = Q.race([d1.promise, Q.resolve(42)]);

    d1.resolve(99);

    const result = await racePromise;
    expect(result).toBe(42);
  });
});