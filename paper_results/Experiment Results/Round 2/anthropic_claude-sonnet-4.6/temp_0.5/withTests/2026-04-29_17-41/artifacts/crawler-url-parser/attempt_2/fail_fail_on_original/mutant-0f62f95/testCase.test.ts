describe('module loading behavior', () => {
  it('should not call console.log when the module is required (not run directly)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the require cache to force re-execution of module-level code
    const modulePath = require.resolve('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Re-require the module
    // Original: if (!module.parent) - won't execute since module.parent is set when required
    // Mutated: if (module.parent) - WILL execute since module.parent is set when required
    require('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});