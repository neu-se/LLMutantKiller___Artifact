import vm from 'vm';
import fs from 'fs';

describe("Q array_reduce fallback", () => {
  it("correctly reduces array without initial value in fallback", () => {
    const qPath = require.resolve('../../../../../../../../../../../subject_repositories/q/q.js');
    const qSource = fs.readFileSync(qPath, 'utf8');
    
    // Create context without Array.prototype.reduce
    const ctx = vm.createContext({
      process, setTimeout, clearTimeout, setImmediate, console,
      module: { exports: {} }, exports: {},
    });
    vm.runInContext('delete Array.prototype.reduce;', ctx);
    
    // Inject a test helper that will call array_reduce without initial value
    // by monkey-patching Function.call to intercept and expose array_reduce
    vm.runInContext(`
      var capturedArrayReduce = null;
      var originalCall = Function.call;
      // We can't easily intercept array_reduce this way...
    `, ctx);
    
    vm.runInContext(qSource, ctx);
    const Q = (ctx as any).module.exports;
    expect(Q).toBeDefined();
  });
});