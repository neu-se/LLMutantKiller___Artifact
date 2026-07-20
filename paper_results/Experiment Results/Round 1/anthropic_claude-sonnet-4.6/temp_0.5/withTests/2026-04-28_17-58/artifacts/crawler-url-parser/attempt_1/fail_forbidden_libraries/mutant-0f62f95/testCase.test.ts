import { jest } from '@jest/globals';

describe('module.parent mutation detection', () => {
  it('should not call console.log when module is required (not run directly)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the require cache to force re-execution of the module
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Re-require the module - in original code (!module.parent), console.log should NOT be called
    // In mutated code (module.parent), console.log WILL be called because module.parent is truthy
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});