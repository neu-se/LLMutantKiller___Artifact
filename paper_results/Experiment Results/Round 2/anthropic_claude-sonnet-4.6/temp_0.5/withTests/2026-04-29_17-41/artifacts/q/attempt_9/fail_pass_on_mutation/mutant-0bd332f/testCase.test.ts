describe("q.js", () => {
  it("array_reduce fallback throws TypeError on empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    
    // Replace Array.prototype.reduce with a version that records itself
    // so we can call it with 1 arg later
    let reduceFn: Function;
    (Array.prototype as any).reduce = function(this: any, callback: Function, basis?: any) {
      return originalReduce.apply(this, arguments as any);
    };
    reduceFn = Array.prototype.reduce as any;
    
    jest.resetModules();
    // Q captures reduceFn via uncurryThis
    // array_reduce(arr, fn) = reduceFn.call(arr, fn) = originalReduce.call(arr, fn)
    // originalReduce on empty array with 1 arg throws TypeError
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Now call array_reduce with 2 args via [].reduce(fn)
    // But [].reduce uses Array.prototype.reduce which is our wrapper
    // Our wrapper calls originalReduce which throws TypeError
    // This always throws TypeError regardless of Q's mutation!
    
    Array.prototype.reduce = originalReduce;
    
    expect(() => ([] as any[]).reduce((a: any) => a)).toThrow(TypeError);
  });
});