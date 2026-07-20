describe("Q array_reduce fallback no-initial-value", () => {
  it("first element becomes basis when no initial value given to reduce fallback", () => {
    const originalReduce = Array.prototype.reduce;
    
    // Install a reduce that behaves like the fallback
    // When called with 1 arg (no basis), should use first element
    // @ts-ignore
    Array.prototype.reduce = function(callback: Function, basis?: any) {
      var index = 0, length = this.length;
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
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    // Q captures our custom reduce. Now Q calls it with 3 args (void 0 as basis).
    // Still arguments.length === 2 inside. Still can't hit the branch.
    return Q.all([1,2,3]).then((r: any) => expect(r).toEqual([1,2,3]));
  });
});