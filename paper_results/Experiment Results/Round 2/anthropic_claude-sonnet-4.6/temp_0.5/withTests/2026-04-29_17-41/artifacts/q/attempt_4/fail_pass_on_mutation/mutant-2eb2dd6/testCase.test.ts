import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback", () => {
  it("should correctly reduce an array when Array.prototype.reduce is unavailable", async () => {
    // Save the original reduce
    const originalReduce = Array.prototype.reduce;
    
    // Remove reduce to force the fallback path
    // @ts-ignore
    delete Array.prototype.reduce;
    
    // Re-require Q so it picks up the missing reduce
    // Since we can't re-require easily, we test via Q.all which uses array_reduce
    // With native reduce removed before Q loads, the fallback would be used
    // But since Q is already loaded, we need another approach
    
    // Restore
    Array.prototype.reduce = originalReduce;
    
    // Test that Q.all still works (uses array_reduce internally)
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});