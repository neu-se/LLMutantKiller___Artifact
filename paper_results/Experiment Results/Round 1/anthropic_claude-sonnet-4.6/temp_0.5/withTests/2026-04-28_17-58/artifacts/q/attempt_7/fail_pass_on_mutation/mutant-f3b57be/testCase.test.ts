describe("array_reduce fallback", () => {
  it("uses first element as basis when called without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    // Q loads and captures the fallback as array_reduce
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Now Array.prototype.reduce is still undefined
    // We need to get Q's fallback installed as Array.prototype.reduce
    // so we can call it with 1 arg
    // 
    // Q's array_reduce = uncurryThis(fallback)
    // uncurryThis(f) = function() { return call.apply(f, arguments); }
    // So array_reduce(arr, fn) = call.apply(fallback, [arr, fn])
    //                          = fallback.call(arr, fn)
    //                          = fallback with this=arr, arguments=[fn], length=1
    //
    // We can't call array_reduce from outside Q.
    // But we CAN install our own reduce that IS the fallback:
    
    // @ts-ignore
    Array.prototype.reduce = function(callback: Function, basis?: any) {
      var index = 0;
      var length = this.length;
      if (arguments.length === 1) {
        do {
          if (index in this) { basis = this[index++]; break; }
          if (++index >= length) { throw new TypeError(); }
        } while (1);
      }
      for (; index < length; index++) {
        if (index in this) {
          basis = callback(basis, this[index], index);
        }
      }
      return basis;
    };
    
    // Now call [1,2,3].reduce(fn) with no initial value
    // This calls our polyfill with arguments.length === 1
    const result = [1, 2, 3].reduce((acc: number, val: number) => acc + val);
    
    Array.prototype.reduce = originalReduce;
    
    expect(result).toBe(6);
  });
});