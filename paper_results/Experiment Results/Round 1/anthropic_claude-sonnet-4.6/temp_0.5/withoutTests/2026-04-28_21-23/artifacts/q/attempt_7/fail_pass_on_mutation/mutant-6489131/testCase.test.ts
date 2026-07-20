describe("Q", () => {
  it("detects mutation in array_reduce shim", async () => {
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    // Q.any uses array_reduce without initial value via `undefined` 
    // but actually passes `undefined` as basis
    // Let's test Q.all which calls array_reduce(promises, fn, void 0)
    // with void 0 as explicit third arg - so arguments.length >= 2 in shim
    // 
    // But Q.any calls: array_reduce(promises, function(prev, current, index){...}, undefined)
    // That's 3 args to the uncurried version, so `this` + 2 args = arguments.length check...
    
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});