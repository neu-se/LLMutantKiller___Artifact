import { jest } from '@jest/globals';

describe('crawler-url-parser console.log mutation detection', () => {
  it('should log "for testing purpose" when module is loaded', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Clear the module cache to force re-execution of module-level code
    jest.resetModules();
    
    // Re-require the module to trigger the console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    const loggedMessages = consoleSpy.mock.calls.map(call => call[0]);
    expect(loggedMessages).toContain('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});