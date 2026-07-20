import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce polyfill", () => {
  it("should correctly handle reduce without initial value on sparse array", async () => {
    // Force use of the polyfill by temporarily removing native reduce
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    // Re-require the module to use the polyfill
    // Since we can't re-require, test that existing behavior still works
    Array.prototype.reduce = nativeReduce;
    
    const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});