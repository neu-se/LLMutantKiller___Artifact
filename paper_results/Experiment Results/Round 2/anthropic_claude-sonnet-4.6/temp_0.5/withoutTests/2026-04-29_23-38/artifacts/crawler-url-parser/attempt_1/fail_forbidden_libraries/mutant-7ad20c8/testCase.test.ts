import { jest } from '@jest/globals';

describe('crawler-url-parser module loading behavior', () => {
  it('should not execute the testing block when required as a module', () => {
    // Spy on console.log before requiring the module
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear module cache to force re-execution of module-level code
    jest.resetModules();
    
    // Require the module - in original code, the if(!module.parent) block should NOT run
    // In mutated code (if(true)), the block WILL run and call console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // Check if console.log was called with "for testing purpose"
    const wasCalledWithTestingPurpose = consoleSpy.mock.calls.some(
      call => call[0] === "for testing purpose"
    );
    
    // Restore the spy
    consoleSpy.mockRestore();
    
    // In original: module.parent is set (we're requiring it), so !module.parent is false
    // The block should NOT execute, so console.log should NOT have been called
    expect(wasCalledWithTestingPurpose).toBe(false);
  });
});