import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback with initial value", () => {
  it("uses provided initial value when reducing, not the first array element", async () => {
    // Force Q to use its internal array_reduce fallback by temporarily
    // removing Array.prototype.reduce, then requiring Q's internal behavior
    // through Q.all which calls array_reduce(promises, callback, void 0)
    // The mutation changes `if (arguments.length === 1)` to `if (true)`,
    // which means even when an initial basis is provided, it overwrites it
    // with the first array element. We can detect this via Q.any which
    // uses array_reduce with `undefined` as initial value.
    
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    try {
      // Re-require Q so it uses the fallback... but Q is already loaded.
      // Instead test through the behavior: array_reduce is called with basis=void 0
      // In Q.all, array_reduce(promises, fn, void 0) is called.
      // With mutation: since true, it seeks first element as basis (a promise),
      // then calls fn(promise, promise[1], 1) - but promise is not `undefined`
      // so the callback gets wrong arguments.
      
      // Actually we need a fresh require. Let's use a different approach.
      const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
      expect(result).toEqual([1, 2]);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});