describe("Q reduce polyfill", () => {
  it("polyfill throws TypeError for empty array without initial value rather than infinite looping", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    // Capture the polyfill by intercepting uncurryThis
    const originalCall = Function.call;
    let capturedPolyfill: Function | null = null;
    
    // @ts-ignore
    Function.call = function(...args: any[]) {
      // When uncurryThis wraps the polyfill, capture it
      if (typeof args[1] === 'function' && !capturedPolyfill) {
        capturedPolyfill = args[1];
      }
      return originalCall.apply(this, args);
    };
    
    jest.resetModules();
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Function.call = originalCall;
      Array.prototype.reduce = originalReduce;
    }
    
    // Now call the polyfill directly without initial value on empty array
    // Original (++index): throws TypeError
    // Mutated (--index): infinite loop -> test timeout
    if (capturedPolyfill) {
      expect(() => {
        capturedPolyfill!.call([], (a: any, b: any) => b);
      }).toThrow(TypeError);
    }
  });
});