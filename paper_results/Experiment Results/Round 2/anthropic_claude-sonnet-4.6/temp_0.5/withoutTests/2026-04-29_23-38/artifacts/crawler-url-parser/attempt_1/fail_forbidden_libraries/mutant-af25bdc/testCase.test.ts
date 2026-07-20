import { jest } from '@jest/globals';

describe('crawler-url-parser console.log behavior', () => {
  it('should call console.log with "for testing purpose" when module is loaded', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Clear module cache to force re-execution of module-level code
    jest.resetModules();
    
    // Re-require the module to trigger the console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // Check that console.log was called with "for testing purpose"
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});