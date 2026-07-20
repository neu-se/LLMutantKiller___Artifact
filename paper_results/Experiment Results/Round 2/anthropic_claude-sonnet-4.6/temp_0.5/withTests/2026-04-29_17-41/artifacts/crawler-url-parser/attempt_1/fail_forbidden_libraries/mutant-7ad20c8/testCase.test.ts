import { jest } from '@jest/globals';

describe('module loading behavior', () => {
  it('should not execute the testing block when required as a module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear module cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    const wasCalledWithTestingPurpose = consoleSpy.mock.calls.some(
      call => call[0] === 'for testing purpose'
    );
    
    consoleSpy.mockRestore();
    
    expect(wasCalledWithTestingPurpose).toBe(false);
  });
});