import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first settled promise value, not undefined", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const racePromise = Q.race([deferred1.promise, deferred2.promise]);

    // Resolve deferred1 with a specific value
    deferred1.resolve(42);

    const result = await racePromise;

    // With the mutation (i <= len), the race would resolve with undefined
    // because it accesses answerPs[len] which is undefined
    expect(result).toBe(42);
  });
});