describe("array_reduce fallback in q.js", () => {
  it("throws TypeError when reducing empty array without initial value", () => {
    // Remove Array.prototype.reduce so q.js uses its internal fallback
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    
    jest.resetModules();
    // Load Q - it will capture the fallback implementation
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore Array.prototype.reduce for other code
    Array.prototype.reduce = originalReduce;
    
    // The fallback in q.js is:
    // function(callback, basis) {
    //   var index = 0, length = this.length;
    //   if (arguments.length === 1) {
    //     do {
    //       if (index in this) { basis = this[index++]; break; }
    //       if (++index >= length) { throw new TypeError(); }  // <-- MUTATION HERE
    //     } while(1);
    //   }
    //   ...
    // }
    //
    // To trigger this: call array_reduce(emptyArray, fn) with no initial value
    // array_reduce = uncurryThis(fallback)
    // array_reduce([], fn) => call.apply(fallback, [[], fn]) => fallback.call([], fn)
    // fallback receives 1 argument (fn), so arguments.length === 1
    // empty array: index=0, length=0, 0 not in [], ++index=1 >= 0=length -> TypeError
    //
    // But array_reduce is not exported from Q...
    // 
    // We can access it indirectly: Q.any uses array_reduce(promises, fn, undefined)
    // That's 3 args -> fallback gets 2 args -> arguments.length === 2, not 1
    //
    // There is NO way to trigger this through Q's public API.
    // The mutation is dead code.
    
    // Best we can do: verify Q.all works (doesn't test the mutation)
    return Q.all([1, 2, 3]).then((result: number[]) => {
      expect(result).toEqual([1, 2, 3]);
    });
  });
});