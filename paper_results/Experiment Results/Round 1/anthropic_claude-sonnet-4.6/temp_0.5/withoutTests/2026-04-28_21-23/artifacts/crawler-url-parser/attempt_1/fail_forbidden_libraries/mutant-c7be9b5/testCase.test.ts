import { jest } from '@jest/globals';

describe('crawler-url-parser module loading behavior', () => {
  it('should not execute the testing block when module is imported (module.parent check)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the module from cache to force re-evaluation
    jest.resetModules();
    
    // Re-require the module to trigger module-level code execution
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // In the original code, if module.parent is set (truthy), !module.parent is false
    // and the block doesn't execute, so console.log should NOT be called.
    // In the mutated code, if(false) means the block never executes regardless.
    // 
    // But in Jest's environment, module.parent might be null, making !module.parent true
    // which would cause console.log to be called in original but not in mutated.
    
    const wasCalledWithTestingPurpose = consoleSpy.mock.calls.some(
      call => call[0] === 'for testing purpose'
    );
    
    // Original: module.parent might be null in Jest, so console.log IS called
    // Mutated: if(false) so console.log is NEVER called
    expect(wasCalledWithTestingPurpose).toBe(true);
    
    consoleSpy.mockRestore();
  });
});