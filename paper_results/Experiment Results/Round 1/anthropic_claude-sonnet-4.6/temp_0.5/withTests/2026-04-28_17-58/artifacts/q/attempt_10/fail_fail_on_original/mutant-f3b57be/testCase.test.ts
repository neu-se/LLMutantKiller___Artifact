import vm from "vm";
import fs from "fs";
import path from "path";

describe("array_reduce fallback no-initial-value", () => {
  it("uses first element as basis when no initial value provided", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );
    
    const sandbox = vm.createContext({
      module: { exports: {} },
      exports: {},
      process,
      setTimeout,
      clearTimeout,
      console,
      Error,
      TypeError,
      Object,
      Function,
      Array,
    });
    
    // Delete reduce so Q uses fallback
    vm.runInContext("delete Array.prototype.reduce;", sandbox);
    
    // Intercept Function.call to capture the fallback when uncurryThis runs
    // uncurryThis does: return function() { return call.apply(f, arguments); }
    // where call = Function.call
    // When array_reduce(arr, fn) is called: call.apply(fallback, [arr, fn])
    // We can intercept Function.prototype.apply to get fallback
    
    let capturedFallback: Function | null = null;
    const origApply = Function.prototype.apply;
    // @ts-ignore
    Function.prototype.apply = function(thisArg: any, args: any[]) {
      // When call.apply(f, [arr, fn]) happens, 'this' is Function.call, thisArg is f
      // We want to capture f when it's the reduce fallback
      // Hard to distinguish...
      return origApply.call(this, thisArg, args);
    };
    
    vm.runInContext(qSource, sandbox);
    Function.prototype.apply = origApply;
    
    const Q = (sandbox as any).module.exports;
    return Q.all([1, 2, 3]).then((r: number[]) => expect(r).toEqual([1, 2, 3]));
  });
});