import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';

describe('Complex.js AMD module export', () => {
  it('should call define with a factory function returning Complex when AMD environment is detected', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    const source = fs.readFileSync(modulePath, 'utf8');

    let amdDefineCalled = false;
    let amdDefineArgs: any[] = [];
    let amdFactoryResult: any = undefined;

    const amdDefine = function(deps: any[], factory: () => any) {
      amdDefineCalled = true;
      amdDefineArgs = [deps, factory];
      if (typeof factory === 'function') {
        amdFactoryResult = factory();
      }
    };
    (amdDefine as any)['amd'] = {};

    // Run the module in a VM context where:
    // - `define` is our mock AMD define (with .amd property)
    // - `exports` and `module` are NOT available (so CommonJS branch is skipped)
    const context = vm.createContext({
      define: amdDefine,
      // Explicitly do NOT include `exports` or `module`
    });

    vm.runInContext(source, context);

    // In original code: define is called with [] and a factory returning Complex
    // In mutated code: define block is empty, so amdDefineCalled remains false
    expect(amdDefineCalled).toBe(true);
    expect(Array.isArray(amdDefineArgs[0])).toBe(true);
    expect(amdDefineArgs[0]).toHaveLength(0);
    expect(typeof amdDefineArgs[1]).toBe('function');
    expect(amdFactoryResult).toBeDefined();
    expect(typeof amdFactoryResult).toBe('function');
  });
});