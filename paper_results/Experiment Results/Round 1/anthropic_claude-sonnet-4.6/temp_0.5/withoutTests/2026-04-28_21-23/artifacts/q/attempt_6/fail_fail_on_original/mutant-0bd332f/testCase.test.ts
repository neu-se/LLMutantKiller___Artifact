describe("Q array_reduce fallback TypeError", () => {
  it("throws TypeError on empty array without initial value in fallback", () => {
    const originalReduce = Array.prototype.reduce;
    const originalApply = Function.prototype.apply;
    // @ts-ignore
    delete Array.prototype.reduce;

    const capturedFns: Function[] = [];
    // @ts-ignore
    Function.prototype.apply = function (this: any, ctx: any, args: any) {
      if (typeof ctx === "function" && !capturedFns.includes(ctx)) {
        capturedFns.push(ctx);
      }
      return originalApply.call(this, ctx, args);
    };

    jest.resetModules();
    require("../../../../../../../../../../../subject_repositories/q/q.js");
    // @ts-ignore
    Function.prototype.apply = originalApply;
    Array.prototype.reduce = originalReduce;

    // Find the reduce fallback: a function that reduces [1,2,3] with sum to 6
    // when called with no initial value (arguments.length === 1)
    const reduceCandidates: Function[] = [];
    for (const fn of capturedFns) {
      try {
        const result = fn.call([1, 2, 3], (a: number, b: number) => a + b);
        if (result === 6) {
          reduceCandidates.push(fn);
        }
      } catch (_e) {
        // not a reduce-like function
      }
    }

    expect(reduceCandidates.length).toBeGreaterThan(0);

    // Use proxy to terminate infinite loop on mutant
    let hasCheckCount = 0;
    const emptyProxy = new Proxy([] as any[], {
      has(_target, _prop) {
        if (++hasCheckCount > 5) {
          throw new RangeError("Too many iterations");
        }
        return false;
      },
      get(_target, prop) {
        if (prop === "length") return 0;
        return undefined;
      },
    });

    let threwTypeError = false;
    for (const fn of reduceCandidates) {
      hasCheckCount = 0;
      try {
        fn.call(emptyProxy, (a: any, b: any) => b);
      } catch (e) {
        if (e instanceof TypeError) {
          threwTypeError = true;
          break;
        }
      }
    }

    expect(threwTypeError).toBe(true);
  });
});