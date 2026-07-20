import { jest } from '@jest/globals';

describe('module loading behavior', () => {
  it('should not call console.log when the module is required (not run directly)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the require cache to force re-execution of module-level code
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Re-require the module - this simulates being required by another module
    // In original code: if (!module.parent) - won't execute since module.parent is set
    // In mutated code: if (module.parent) - WILL execute since module.parent is set
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});