import * as vm from 'vm';
import * as fs from 'fs';

describe("Q array_reduce polyfill", () => {
  it("should advance index forward (++) not backward (--) when finding first element in sparse array", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, 'utf8');

    const ctx = vm.createContext({
      process,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
      module: { exports: {} },
      exports: {},
    });

    // Step 1: Delete Array.prototype.reduce so Q uses its polyfill
    // Step 2: Intercept Function.call (captured as `call` in Q's closure)
    //         so when array_reduce(arr, fn, init) is called,
    //         call.apply(polyfill, [arr, fn, init]) hits our spy
    //         and we capture `polyfill` as the first arg to .apply
    vm.runInContext(`
      delete Array.prototype.reduce;

      var __origFunctionCall = Function.call;
      var __capturedPolyfill = null;

      var __spyCall = function() {
        return __origFunctionCall.apply(this, arguments);
      };
      // When call.apply(f, arguments) is invoked, our spy's .apply runs:
      // 'thisArg' = f (the polyfill), 'argsArray' = [arr, callback, basis]
      __spyCall.apply = function(thisArg, argsArray) {
        if (typeof thisArg === 'function' && __capturedPolyfill === null) {
          // The first function called this way during Q init is array_slice's target,
          // but we want the reduce polyfill specifically.
          // We'll capture all and identify the right one later.
        }
        return __origFunctionCall.apply(thisArg, argsArray);
      };

      Function.call = __spyCall;
    `, ctx);

    vm.runInContext(qSource, ctx);

    // Trigger array_reduce by calling Q.all - this calls array_reduce(promises, fn, void 0)
    // which calls call.apply(polyfill, [promises, fn, void 0])
    // Our spy captures polyfill as thisArg
    vm.runInContext(`
      var __allCaptured = [];
      __spyCall.apply = function(thisArg, argsArray) {
        if (typeof thisArg === 'function') {
          __allCaptured.push({fn: thisArg, args: argsArray});
        }
        return __origFunctionCall.apply(thisArg, argsArray);
      };

      var Q = module.exports;
      // Trigger array_reduce synchronously
      Q.all([Q.resolve(1), Q.resolve(2)]);
    `, ctx);

    const allCaptured = vm.runInContext('__allCaptured', ctx) as Array<{fn: Function, args: any[]}>;

    // Find the reduce polyfill: it's called with (arr, callback, void 0)
    // where arr is an array of promises and callback is a function
    // The polyfill has signature: function(callback, basis) - 2 params
    const reducePolyfill = allCaptured.find(
      ({fn, args}) => args && args.length === 3 && Array.isArray(args[0]) && typeof args[1] === 'function'
    )?.fn;

    expect(reducePolyfill).toBeDefined();

    if (reducePolyfill) {
      // Now test the polyfill directly with a sparse array and NO initial value
      // Original (++index): advances forward, finds first non-sparse element, works correctly
      // Mutated (--index): decrements to -1, -1 >= length is false, infinite loop
      
      // Use a sparse array where index 0 is empty, index 1 has a value
      const sparse: any[] = [];
      sparse[1] = 42;

      // Call polyfill with 1 argument (no initial value) - triggers the do-while
      // Original: finds sparse[1] = 42, returns 42
      // Mutated: infinite loop (test would hang/timeout)
      let result: any;
      let threw = false;
      try {
        result = reducePolyfill.call(sparse, (acc: any, val: any) => acc + val);
      } catch (e) {
        threw = true;
      }

      // Original: result = 42 (found first element at index 1)
      // Mutated: infinite loop (never reaches here within timeout)
      expect(threw).toBe(false);
      expect(result).toBe(42);
    }
  });
});