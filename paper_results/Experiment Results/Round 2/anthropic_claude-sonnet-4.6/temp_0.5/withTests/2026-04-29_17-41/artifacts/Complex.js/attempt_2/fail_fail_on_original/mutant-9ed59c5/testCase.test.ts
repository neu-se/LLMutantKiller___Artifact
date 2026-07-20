import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js AMD module export', () => {
  it('should call define with a factory function returning Complex when AMD environment is detected', () => {
    let defineCalled = false;
    let factoryResult: any = undefined;

    const mockDefine = function(deps: any[], factory: () => any) {
      defineCalled = true;
      if (typeof factory === 'function') {
        factoryResult = factory();
      }
    };
    (mockDefine as any)['amd'] = {};

    // Clear require cache to force re-evaluation with AMD environment
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    delete require.cache[modulePath];

    // Temporarily set up AMD environment by overriding global define
    const globalAny = global as any;
    const originalDefine = globalAny.define;

    globalAny.define = mockDefine;

    // We need to evaluate the module in a context where exports is not an object
    // so the AMD branch is taken. We'll use a trick with the module system.
    // Since node has `exports`, we need to patch the module loading.
    // Instead, let's directly test by re-running the IIFE with a mock root.

    // Restore define
    if (originalDefine !== undefined) {
      globalAny.define = originalDefine;
    } else {
      delete globalAny.define;
    }

    // Re-require to get fresh module
    delete require.cache[modulePath];
    const ComplexModule = require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');

    // The module loaded correctly via CommonJS
    expect(ComplexModule).toBeDefined();

    // Now test AMD path by reading the source and executing it with a fake environment
    const fs = require('fs');
    const path = require('path');
    const source = fs.readFileSync(modulePath, 'utf8');

    let amdDefineCalled = false;
    let amdFactoryResult: any = undefined;

    const amdDefine = function(deps: any[], factory: () => any) {
      amdDefineCalled = true;
      if (typeof factory === 'function') {
        amdFactoryResult = factory();
      }
    };
    (amdDefine as any)['amd'] = {};

    // Execute the module source in a context without `exports` and with AMD define
    const wrappedSource = `(function(define) { var module = undefined; var exports = undefined; ${source} })(amdDefine)`;
    
    try {
      const fn = new Function('amdDefine', `var module = undefined; var exports = undefined; ${source}`);
      fn(amdDefine);
    } catch (e) {
      // ignore errors from missing exports
    }

    // In original code: define is called with [] and a factory returning Complex
    // In mutated code: define block is empty, so amdDefineCalled remains false
    expect(amdDefineCalled).toBe(true);
    expect(amdFactoryResult).toBeDefined();
    expect(typeof amdFactoryResult).toBe('function');
  });
});