// Jest test file containing exactly one test case
import { createRequire } from 'module';
import * as path from 'path';

describe('Complex.js AMD module registration', () => {
  it('should call define() with a factory function in AMD environments', () => {
    // Set up a mock AMD define function
    let defineCalled = false;
    let factoryResult: any = null;
    
    const mockDefine = function(deps: any[], factory: () => any) {
      defineCalled = true;
      factoryResult = factory();
    };
    (mockDefine as any).amd = {};
    
    // Set the global define before requiring the module
    (global as any).define = mockDefine;
    
    // Clear the module cache to force re-execution
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    delete require.cache[modulePath];
    
    require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    
    // Clean up
    delete (global as any).define;
    delete require.cache[modulePath];
    
    expect(defineCalled).toBe(true);
    expect(factoryResult).not.toBeNull();
    expect(typeof factoryResult).toBe('function');
  });
});