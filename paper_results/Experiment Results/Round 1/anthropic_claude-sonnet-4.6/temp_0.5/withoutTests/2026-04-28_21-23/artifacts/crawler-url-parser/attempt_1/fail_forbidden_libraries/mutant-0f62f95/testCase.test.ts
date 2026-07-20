import { jest } from '@jest/globals';

describe('crawler-url-parser module loading behavior', () => {
  it('should not execute the main block when required as a module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the module from cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Require the module - in original code, the if(!module.parent) block should NOT run
    // In mutated code, if(module.parent) block WILL run, calling console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // In original code: console.log should NOT be called (module.parent is truthy, !module.parent is false)
    // In mutated code: console.log WILL be called (module.parent is truthy, condition is true)
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});