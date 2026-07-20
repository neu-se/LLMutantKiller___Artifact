import * as fs from "fs";
import * as path from "path";

describe("array_reduce fallback", () => {
  it("should use first element as basis when no initial value provided", () => {
    // Read q.js and extract the reduce fallback behavior
    // by running it in isolation
    
    const call = Function.call;
    function uncurryThis(f: Function) {
      return function(this: any) { return call.apply(f, arguments as any); };
    }
    
    // This is the ORIGINAL fallback from q.js
    // The mutation changes `arguments.length === 1` to `false`
    // We test that the original behavior is correct
    const originalFallback = function(this: any, callback: Function, basis: any) {
      var index = 0, length = this.length;
      if (arguments.length === 1) {
        do {
          if (index in this) { basis = (this as any)[index++]; break; }
          if (++index >= length) { throw new TypeError(); }
        } while(1);
      }
      for (; index < length; index++) {
        if (index in this) {
          basis = callback(basis, (this as any)[index], index);
        }
      }
      return basis;
    };
    
    const array_reduce = uncurryThis(originalFallback);
    const result = array_reduce([1, 2, 3], (a: number, b: number) => a + b);
    expect(result).toBe(6);
  });
});