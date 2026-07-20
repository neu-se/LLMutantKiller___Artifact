describe("Q array_reduce shim without initial value", () => {
  it("reduces array correctly without initial basis value", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.reduce = originalReduce;
    
    // Now Q uses the shim. Test Q.all which uses array_reduce with void 0 as basis
    // The shim's for loop: basis starts as undefined, callback called with (undefined, promise, index)
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});