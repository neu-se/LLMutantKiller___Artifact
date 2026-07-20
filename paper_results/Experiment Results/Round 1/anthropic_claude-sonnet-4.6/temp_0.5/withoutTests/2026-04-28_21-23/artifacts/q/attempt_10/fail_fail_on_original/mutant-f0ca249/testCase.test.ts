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

    // Delete Array.prototype.reduce so Q uses its polyfill.
    // Also capture the polyfill by intercepting Function.prototype.call
    // WITHIN the vm context before Q loads.
    // Q does: var call = Function.call; then later: call.apply(f, arguments)
    // We need Function.call in the vm context to be our spy.
    vm.runInContext(`
      delete Array.prototype.reduce;

      // Capture all functions invoked via call.apply(fn, args)
      var __captured = [];
      var __realCall = Function.prototype.call;

      // Override Function.prototype.call so our spy IS Function.call
      Object.defineProperty(Function.prototype, 'call', {
        value: function __spyCall() {
          return __realCall.apply(this, arguments);
        },
        writable: true,
        configurable: true
      });

      // Also override Function.prototype.apply to intercept call.apply(f, args)
      var __realApply = Function.prototype.apply;
      Object.defineProperty(Function.prototype, 'apply', {
        value: function __spyApply(thisArg, argsArray) {
          // When call.apply(f, [arr, fn, init]) happens:
          // 'this' = our spy call function
          // thisArg = f (the polyfill)
          // argsArray = [arr, fn, init]
          if (
            typeof thisArg === 'function' &&
            argsArray && argsArray.length === 3 &&
            Array.isArray(argsArray[0]) &&
            typeof argsArray[1] === 'function'
          ) {
            __captured.push(thisArg);
          }
          return __realApply.call(this, thisArg, argsArray);
        },
        writable: true,
        configurable: true
      });
    `, ctx);

    // Load Q - it will capture our modified Function.call as `call`
    vm.runInContext(qSource, ctx);

    // Restore Function.prototype.apply to avoid interference
    vm.runInContext(`
      Object.defineProperty(Function.prototype, 'apply', {
        value: __realApply, writable: true, configurable: true
      });
    `, ctx);

    // Trigger array_reduce by calling Q.all
    vm.runInContext(`
      var Q = module.exports;
      Q.all([1, 2, 3]);
    `, ctx);

    const captured = vm.runInContext('__captured', ctx) as Function[];

    expect(captured.length).toBeGreaterThan(0);

    // The first captured function should be the reduce polyfill
    const reducePolyfill = captured[0];

    // Test with sparse array, no initial value - triggers the do-while loop
    // Original (++index): finds sparse[1]=42, returns 42
    // Mutated (--index): infinite loop
    const sparse: any[] = [];
    sparse[1] = 42;

    const result = reducePolyfill.call(sparse, (acc: any, val: any) => acc + val);
    expect(result).toBe(42);
  });
});