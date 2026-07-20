describe("Q array_reduce fallback TypeError", () => {
  it("throws TypeError on empty array without initial value in fallback", () => {
    const originalReduce = Array.prototype.reduce;
    const originalApply = Function.prototype.apply;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    const capturedFns: Function[] = [];
    // @ts-ignore
    Function.prototype.apply = function(this: any, ctx: any, args: any) {
      if (typeof ctx === 'function') {
        capturedFns.push(ctx);
      }
      return originalApply.call(this, ctx, args);
    };
    
    jest.resetModules();
    require("../../../../../../../../../../../subject_repositories/q/q.js");
    // @ts-ignore
    Function.prototype.apply = originalApply;
    Array.prototype.reduce = originalReduce;
    
    // Find the array_reduce fallback
    let reduceFallback: Function | null = null;
    for (const fn of capturedFns) {
      try {
        const result = fn.call([1, 2, 3], (a: number, b: number) => a + b);
        if (result === 6) {
          reduceFallback = fn;
          break;
        }
      } catch (e) {
        // not the reduce fallback
      }
    }
    
    expect(reduceFallback).not.toBeNull();
    
    // Test with a Proxy that throws after too many 'in' checks
    // Original: throws TypeError immediately
    // Mutant: loops and eventually triggers our Proxy error
    let accessCount = 0;
    const sparseProxy = new Proxy([] as any[], {
      has(_target, _prop) {
        accessCount++;
        if (accessCount > 5) {
          throw new Error("Mutant detected: infinite loop");
        }
        return false;
      },
      get(_target, prop) {
        if (prop === 'length') return 0;
        return undefined;
      }
    });
    
    let threwTypeError = false;
    try {
      reduceFallback!.call(sparseProxy, (a: any, b: any) => b);
    } catch (e) {
      if (e instanceof TypeError) {
        threwTypeError = true;
      }
      // If it's our custom Error, threwTypeError stays false
    }
    
    expect(threwTypeError).toBe(true);
  });
});