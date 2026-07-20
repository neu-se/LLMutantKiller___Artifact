import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first settled promise without accessing out-of-bounds array index", async () => {
    const p1 = Q.defer();
    const p2 = Q.defer();
    
    const racePromise = Q.race([p1.promise, p2.promise]);
    
    p1.resolve(42);
    
    const result = await racePromise;
    expect(result).toBe(42);
  });
});