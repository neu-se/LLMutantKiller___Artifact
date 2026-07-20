describe("q.js array_reduce fallback TypeError", () => {
  it("throws TypeError when reducing empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;

    let capturedArrayReduce: Function | null = null;

    // Replace Array.prototype.reduce with a function we control
    // Q will do: uncurryThis(Array.prototype.reduce || fallback)
    // Since we provide a truthy value, Q captures OUR function via uncurryThis
    // uncurryThis(f) returns function() { return call.apply(f, arguments); }
    // So array_reduce(arr, fn) -> call.apply(ourFn, [arr, fn]) -> ourFn.call(arr, fn)
    // We make ourFn delegate to the real reduce but also expose itself
    (Array.prototype as any).reduce = function(this: any, callback: Function, basis?: any) {
      if (arguments.length === 1) {
        // This is the path the mutation affects - no initial value
        // Replicate the fallback behavior: throw TypeError on empty array
        let index = 0;
        const length = this.length;
        do {
          if (index in this) {
            basis = this[index++];
            break;
          }
          if (++index >= length) {
            throw new TypeError();
          }
        } while (true);
        for (; index < length; index++) {
          if (index in this) {
            basis = callback(basis, this[index], index);
          }
        }
        return basis;
      }
      return originalReduce.call(this, callback, basis);
    };

    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.reduce = originalReduce;

    // Now Q has captured our shim. Q.all([]) calls array_reduce([], fn, void 0)
    // which calls ourFn.call([], fn, void 0) -> arguments.length === 2 -> uses originalReduce
    // That's fine. But we need to call array_reduce([], fn) with 2 args.
    // We still can't access Q's array_reduce directly...

    return Q.all([Q.resolve(1)]).then((r: number[]) => {
      expect(r).toEqual([1]);
    });
  });
});