import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.race", () => {
  it("should not throw when racing an array of promises", async () => {
    const d1 = Q.defer();
    const d2 = Q.defer();

    let errorOccurred = false;
    let racePromise: any;

    try {
      racePromise = Q([d1.promise, d2.promise]).race();
    } catch (e) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBe(false);

    d1.resolve("winner");

    const result = await racePromise;
    expect(result).toBe("winner");
  });
});