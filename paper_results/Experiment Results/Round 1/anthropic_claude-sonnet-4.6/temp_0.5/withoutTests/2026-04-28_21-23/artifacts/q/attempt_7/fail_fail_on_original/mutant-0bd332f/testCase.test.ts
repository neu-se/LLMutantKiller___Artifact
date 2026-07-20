import vm from 'vm';
import fs from 'fs';

describe("Q array_reduce fallback TypeError", () => {
  it("throws TypeError on empty array without initial value in fallback", async () => {
    const qPath = require.resolve('../../../../../../../../../../../subject_repositories/q/q.js');
    const qSource = fs.readFileSync(qPath, 'utf8');
    
    // Create a VM context
    const capturedFns: Function[] = [];
    const context = vm.createContext({
      module: { exports: {} },
      exports: {},
      setTimeout,
      process,
      capturedFns,
    });
    
    // Delete Array.prototype.reduce in this context so Q uses fallback
    vm.runInContext('delete Array.prototype.reduce;', context);
    
    // Set up interception in the context
    vm.runInContext(`
      var _origApply = Function.prototype.apply;
      Function.prototype.apply = function(ctx, args) {
        if (typeof ctx === 'function') {
          capturedFns.push(ctx);
        }
        return _origApply.call(this, ctx, args);
      };
    `, context);
    
    // Load Q
    vm.runInContext(qSource, context);
    
    // Trigger array_reduce
    const Q = context.module.exports;
    await new Promise<void>((resolve) => {
      Q.all([Q(1), Q(2), Q(3)]).then(() => resolve());
    });
    
    // Restore
    vm.runInContext('Function.prototype.apply = _origApply;', context);
    
    // Find the reduce fallback
    const reduceCandidates: Function[] = [];
    for (const fn of capturedFns) {
      try {
        const result = fn.call([1, 2, 3], (a: number, b: number) => a + b);
        if (result === 6) reduceCandidates.push(fn);
      } catch (_e) {}
    }
    
    expect(reduceCandidates.length).toBeGreaterThan(0);
    
    // Test with proxy
    let hasCheckCount = 0;
    const emptyProxy = new Proxy([] as any[], {
      has(_t: any, _p: any) {
        if (++hasCheckCount > 5) throw new RangeError("Too many iterations");
        return false;
      },
      get(_t: any, p: any) {
        if (p === "length") return 0;
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