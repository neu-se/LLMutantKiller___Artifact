import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with array_reduce", () => {
  it("should correctly resolve all promises when using array_reduce with an initial basis value", async () => {
    // This test exercises the array_reduce fallback behavior
    // The mutation changes `if (arguments.length === 1)` to `if (true)`
    // which causes the reduce to ignore the provided basis and seek to first element
    // Q.all uses array_reduce with void 0 as basis - if mutation is active,
    // it would try to use the first promise as the basis instead
    
    // Test that Q.all resolves correctly with multiple promises
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ]);
    
    expect(result).toEqual([1, 2, 3]);
  });
});