describe('module loading side effects', () => {
  it('should not call console.log when the module is required as a dependency', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
    
    // Clear the module from cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    consoleSpy.mockClear();
    
    // Require the module - in original code, module.parent is set so the block won't run
    // In mutated code, if (true) always runs the block
    require('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});