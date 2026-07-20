import * as vm from 'vm';
import * as fs from 'fs';

describe("Q array_reduce polyfill", () => {
  it("should advance index forward (++) not backward (--) when finding first element in sparse array", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, 'utf8');

    const allCaptured: Array<{fn: Function, args: any[]}> = [];

    const ctx = vm.createContext({
      process,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
      module: { exports: {} },
      exports: {},
      __allCaptured: allCaptured,
    });

    // Delete Array.prototype.reduce and set up spy BEFORE loading Q
    // so Q captures our spy as `call = Function.call`
    vm.runInContext(`
      delete Array.prototype.reduce;

      var __origFunctionCall = Function.call;

      var __spyCall = function() {
        return __origFunctionCall.apply(this, arguments);
      };
      __spyCall.apply = function(thisArg, argsArray) {
        if (typeof thisArg === 'function' && argsArray && argsArray.length === 3 && Array.isArray(argsArray[0]) && typeof argsArray[1] === 'function') {
          __allCaptured.push({fn: thisArg, args: Array.prototype.slice.call(argsArray)});
        }
        return __origFunctionCall.apply(thisArg, argsArray);
      };

      Function.call = __spyCall;
    `, ctx);

    // Load Q - it captures our spy as `call`
    vm.runInContext(qSource, ctx);

    // Trigger array_reduce by calling Q.all synchronously
    vm.runInContext(`
      var Q = module.exports;
      Q.all([1, 2, 3]);
    `, ctx);

    // allCaptured should now have entries from array_reduce calls
    expect(allCaptured.length).toBeGreaterThan(0);

    const reducePolyfill = allCaptured[0].fn;

    // Test the polyfill directly with a sparse array and NO initial value
    // Original (++index): advances forward past sparse slot, finds element, works
    // Mutated (--index): decrements forever, infinite loop
    const sparse: any[] = [];
    sparse[1] = 42;

    const result = reducePolyfill.call(sparse, (acc: any, val: any) => acc + val);
    expect(result).toBe(42);
  });
});