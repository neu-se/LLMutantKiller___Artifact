describe('crawler-url-parser module loading side effects', () => {
  it('should not call console.log when the module is required as a dependency', () => {
    // Spy on console.log before requiring the module
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear module cache to force re-execution of module-level code
    jest.resetModules();
    
    try {
      // Require the module - in original code, the if(!module.parent) block should NOT run
      // In mutated code (if(true)), the block WILL run and call console.log
      require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    } catch (e) {
      // ignore any errors from the module's testing block
    }
    
    // Check if console.log was called with "for testing purpose"
    const wasCalledWithTestingPurpose = consoleSpy.mock.calls.some(
      (call: any[]) => call[0] === "for testing purpose"
    );
    
    consoleSpy.mockRestore();
    
    // In original: module.parent is set, so !module.parent is false, block does NOT run
    // In mutated: if(true) always runs, so console.log IS called
    expect(wasCalledWithTestingPurpose).toBe(false);
  });
});