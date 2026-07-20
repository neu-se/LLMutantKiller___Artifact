import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.race", () => {
  it("should resolve with the first settled promise value without errors from out-of-bounds access", async () => {
    const d1 = Q.defer();
    const d2 = Q.defer();

    // Create a race via Promise.prototype.race (which uses the for loop with the mutation)
    const racePromise = Q([d1.promise, d2.promise]).race();

    // Resolve d2 first
    d2.resolve("winner");

    const result = await racePromise;
    expect(result).toBe("winner");
  });
});