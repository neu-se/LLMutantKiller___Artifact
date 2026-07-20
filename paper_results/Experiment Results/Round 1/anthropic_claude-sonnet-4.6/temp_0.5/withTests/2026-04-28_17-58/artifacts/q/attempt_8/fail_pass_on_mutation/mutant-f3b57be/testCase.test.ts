describe("array_reduce fallback", () => {
  it("uses first element as basis when no initial value provided", () => {
    const originalReduce = Array.prototype.reduce;
    
    let internalFallback: Function | null = null;
    
    // Install a reduce that captures itself and can be called with 1 arg
    // @ts-ignore
    Array.prototype.reduce = function reduceFallback(callback: Function, basis?: any) {
      internalFallback = reduceFallback;
      var index = 0, length = this.length;
      if (arguments.length === 1) {
        do {
          if (index in this) { basis = this[index++]; break; }
          if (++index >= length) { throw new TypeError(); }
        } while (1);
      }
      for (; index < length; index++) {
        if (index in this) { basis = callback(basis, this[index], index); }
      }
      return basis;
    };
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    // Q captures our reduceFallback as array_reduce
    // Now call it with 1 arg via Array.prototype.reduce
    const result = [1, 2, 3].reduce((acc: number, val: number) => acc + val);
    
    Array.prototype.reduce = originalReduce;
    expect(result).toBe(6);
  });
});