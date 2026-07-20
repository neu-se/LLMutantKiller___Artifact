import vm from 'vm';
import fs from 'fs';

describe("array_reduce fallback", () => {
  it("uses first element as basis when called without initial value", () => {
    const qPath = require.resolve('../../../../../../../../../../../subject_repositories/q/q.js');
    let qSource = fs.readFileSync(qPath, 'utf8');
    
    // Inject array_reduce exposure into the source
    // Find where array_reduce is defined and add an export
    qSource = qSource.replace(
      'var array_reduce = uncurryThis(',
      'var array_reduce = _exposeArrayReduce = uncurryThis('
    );
    
    const ctx = vm.createContext({
      process, setTimeout, clearTimeout, setImmediate, console,
      module: { exports: {} }, exports: {},
      _exposeArrayReduce: null,
    });
    
    vm.runInContext('delete Array.prototype.reduce;', ctx);
    vm.runInContext(qSource, ctx);
    
    const arrayReduce = (ctx as any)._exposeArrayReduce;
    
    // Now call array_reduce without initial value
    const result = arrayReduce([1, 2, 3], (acc: number, val: number) => acc + val);
    expect(result).toBe(6); // 1+2+3 with original, but 0+1+2+3=NaN or different with mutation
  });
});