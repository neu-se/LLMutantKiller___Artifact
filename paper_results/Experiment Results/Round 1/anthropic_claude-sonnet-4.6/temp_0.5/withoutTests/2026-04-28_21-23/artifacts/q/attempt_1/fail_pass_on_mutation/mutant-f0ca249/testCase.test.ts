import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce polyfill mutation detection", () => {
  it("should correctly resolve Q.all with multiple promises", async () => {
    // Q.all uses array_reduce internally
    // This tests that the reduce operation works correctly
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
    ]);
    
    expect(result).toEqual([1, 2, 3]);
    
    // Also test with deferred promises to ensure reduce callback works
    const d1 = Q.defer();
    const d2 = Q.defer();
    
    const allPromise = Q.all([d1.promise, d2.promise]);
    
    d1.resolve(10);
    d2.resolve(20);
    
    const result2 = await allPromise;
    expect(result2).toEqual([10, 20]);
  });
});