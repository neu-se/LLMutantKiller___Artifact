import { jest } from '@jest/globals';

describe('crawler-url-parser module loading behavior', () => {
  it('should not call console.log when the module is required (not run directly)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the module from cache to ensure fresh load
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Require the module - in original code, the if(!module.parent) block should NOT run
    // In mutated code, if(module.parent) block WILL run, calling console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});