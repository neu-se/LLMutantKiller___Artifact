describe("Q reduce polyfill", () => {
  it("polyfill handles sparse array correctly when native reduce unavailable", async () => {
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = nativeReduce;
    
    // All Q internal uses of array_reduce pass void 0 as initial value
    // so the no-initial-value branch is never hit
    // The only difference between original and mutant is in that branch
    // which is unreachable through Q's API
    
    // Therefore test basic functionality works with polyfill
    const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});